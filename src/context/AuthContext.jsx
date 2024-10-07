import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext, useState } from "react";
import appFirebase from "../config/Firebase";
import Swal from "sweetalert2";

const auth = getAuth(appFirebase);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmailVerified, setUserEmailVerified] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [closeModalAuth, setCloseModalAuth] = useState(false);

  // Funciones para abrir y cerrar el modal
  const openModalAuth = () => setCloseModalAuth(true);
  const closeModalAuthFn = () => setCloseModalAuth(false);

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /* estraido de LoginWhitEmail:*/

  const handleAuthentication = async (e) => {
    e.preventDefault();
    let errorsLogin = {};

    // Validación
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

    // Si hay errores, actualiza el estado y detén la ejecución.
    if (Object.keys(errorsLogin).length > 0) {
      setError(errorsLogin);
      return;
    }

    try {
      if (registrando) {
        // Registro de usuario
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bienvenido",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Recuerda validar tu correo electronico",
            showConfirmButton: false,
            timer: 3000,
          });
          setError({ errorVerificacion: "No se ha verificado el correo" });
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
      setCloseModalAuth(false);
    } catch (error) {
      if (registrando) {
        setError({
          errorGeneral: "Error al registrar el usuario. Intenta de nuevo.",
        });
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

  /*  */
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
    openModalAuth,
    handlePasswordReset,
    closeModalAuthFn,
    closeModalAuthState: closeModalAuth,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
