import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import appFirebase, { db } from "../config/Firebase";
import Swal from "sweetalert2";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmailVerified, setUserEmailVerified] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState(""); //asdasdas
  const [nombre, setNombre] = useState(""); //asdasdas
  const [apellido, setApellido] = useState(""); //asdasdas
  const [error, setError] = useState({});
  const [closeModalAuth, setCloseModalAuth] = useState(false);

  // Funciones para abrir y cerrar el modal
  const openModalAuth = () => setCloseModalAuth(true);
  const closeModalAuthFn = () => setCloseModalAuth(false);

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        try {
          // Verificar si el usuario ya tiene datos guardados
          const userDocRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDocRef);
          const additionalUserInfo = JSON.parse(
            localStorage.getItem("additionalUserInfo")
          );

          if (!userSnapshot.exists()) {
            console.log("Datos que intentas guardar:", {
              mail: user.email,
              telefono: user.telephone,
              nombre: user.nombre,
              apellido: user.apellido,
              emailVerified: true,
            });
            // Guardar los datos del usuario en Firestore
            await setDoc(userDocRef, {
              mail: user.email,
              telefono:
                additionalUserInfo?.telephone || "Teléfono no proporcionado",
              nombre: additionalUserInfo?.nombre || "Nombre no proporcionado",
              apellido:
                additionalUserInfo?.apellido || "Apellido no proporcionado",
              emailVerified: true,
            });

            localStorage.removeItem("additionalUserInfo");

            console.log("Datos guardados exitosamente en Firestore");
          }
        } catch (error) {
          console.error("Error al guardar los datos del usuario: ", error);
        }
      }
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, []);

  /* estraido de LoginWhitEmail:*/

  const handleAuthentication = async (e) => {
    e.preventDefault();
    let errorsLogin = {};

    // Validaciónes de los input
    if (!email.trim()) {
      errorsLogin.email = "El campo Email es requerido";
    } else if (!regexEmail.test(email.trim())) {
      errorsLogin.email = "El campo `Email` es incorrecto";
    }

    if (!password.trim()) {
      errorsLogin.password = "El campo `Contraseña` es requerido";
    } else if (registrando && password.length < 6) {
      errorsLogin.password = "La contraseña debe tener 6 o más caracteres";
    }

    if (registrando) {
      if (!telephone.trim()) {
        errorsLogin.telephone = "El campo `Telefono` es requerido";
      } else if (telephone.length < 8) {
        errorsLogin.telephone = "El teléfono debe tener al menos 8 dígitos";
      }
    }

    if (registrando) {
      if (!nombre.trim()) {
        errorsLogin.nombre = "El campo `Nombre` es requerido";
      } else if (/\d/.test(nombre)) {
        // Verifica si contiene números
        errorsLogin.nombre = "El campo `Nombre` no debe contener números";
      }
    }

    if (registrando) {
      if (!apellido.trim()) {
        errorsLogin.apellido = "El campo `Apellido` es requerido";
      } else if (/\d/.test(apellido)) {
        // Verifica si contiene números
        errorsLogin.apellido = "El campo `Apellido` no debe contener números";
      }
    }

    // Si hay errores, actualiza el estado y detén la ejecución.
    if (Object.keys(errorsLogin).length > 0) {
      setError(errorsLogin);
      return;
    }

    try {
      if (registrando) {
        // Registro de usuario
        // const userCredential = await createUserWithEmailAndPassword(
        //   auth,
        //   email,
        //   password
        // );
        // const user = userCredential.user;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Almacenar datos adicionales en localStorage o contexto temporal
        localStorage.setItem(
          "additionalUserInfo",
          JSON.stringify({ nombre, apellido, telephone })
        );

        /**/

        // const usersCollection = collection(db, "users");

        // try {
        //   await addDoc(usersCollection, {
        //     mail: email,
        //     telefono: telephone,
        //     nombre: nombre,
        //     apellido: apellido,
        //   });
        // } catch (firestoreError) {
        //   console.error("Error al guardar en Firestore: ", firestoreError);
        //   setError({
        //     errorGeneral:
        //       "Error al guardar en la base de datos. Intenta de nuevo.",
        //   });
        // }

        /**/

        await sendEmailVerification(user);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Por favor verifica tu correo",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user.emailVerified) {
          setUserEmailVerified(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bienvenido",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setUserEmailVerified(false);
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Recuerda validar tu correo electronico",
            showConfirmButton: false,
            timer: 3000,
          });
        }

        if (user.emailVerified) {
          setUserEmailVerified(true);
        } else {
          setUserEmailVerified(false);
        }
      }

      setError({});
      setEmail("");
      setPassword("");
      setTelephone("");
      setNombre("");
      setApellido("");
      setCloseModalAuth(false);
    } catch (error) {
      if (registrando) {
        if (error.code === "auth/email-already-in-use") {
          setError({
            errorGeneral: "El correo ya está en uso. Por favor utiliza otro.",
          });
        } else if (error.code === "auth/invalid-email") {
          setError({
            errorGeneral: "El correo proporcionado no es válido.",
          });
        } else if (error.code === "auth/weak-password") {
          setError({
            errorGeneral: "La contraseña debe tener al menos 6 caracteres.",
          });
        } else {
          setError({
            errorGeneral: "Error al registrar el usuario. Intenta de nuevo.",
          });
        }
      } else {
        if (error.code === "auth/user-not-found") {
          setError({
            errorEmailNoRegistrado: "El correo no está registrado",
          });
        } else if (error.code === "auth/wrong-password") {
          setError({ errorContraseña: "Contraseña incorrecta" });
        } else {
          setError({
            errorGeneral: "Error al iniciar sesión. Intenta de nuevo.",
          });
        }
      }
    }
  };

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
      });
      closeModalAuthFn(true);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      console.error("Error al enviar correo de restablecimiento: ", error);

      if (error.code === "auth/user-not-found") {
        setError({
          errorEmailNoRegistrado: "El correo no está registrado",
        });
      } else if (!regexEmail.test(email.trim())) {
        setError({
          errorRegex: `Ingrese el correo electronico primero`,
        });
      } else {
        setError({
          errorGeneral: "Error al enviar correo",
        });
      }

      setPassword("");
    }
  };

  const resendVerificationMail = async () => {
    const user = auth.currentUser;

    if (user) {
      await sendEmailVerification(user);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Por favor verifica tu correo",
        showConfirmButton: false,
        timer: 2000,
      });

      await user.reload();
      setUserEmailVerified(user.emailVerified);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No hay un usuario logueado",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    await user.reload();
    setUserEmailVerified(user.emailVerified);
  };

  const data = {
    handleAuthentication,
    registrando,
    setUserEmailVerified,
    userEmailVerified,
    email,
    error,
    password,
    setEmail,
    setPassword,
    setRegistrando,
    setTelephone,
    telephone,
    setNombre,
    nombre,
    setApellido,
    apellido,
    openModalAuth,
    handlePasswordReset,
    closeModalAuthFn,
    closeModalAuthState: closeModalAuth,
    resendVerificationMail,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
