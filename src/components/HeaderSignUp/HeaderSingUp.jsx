import React, { useContext, useEffect, useState } from "react";
import "./headersingup.css";
import LogoNav from "../LogoNav/LogoNav";
import { useModal } from "../../hooks/useModal";
import ModalUserLogin from "../ModalUserLogin/ModalUserLogin";
import appFirebase from "../../config/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ModalChangePassword from "../ModalChangePassword/ModalChangePassword";
import AuthContext from "../../context/AuthContext";

const auth = getAuth(appFirebase);

const HeaderSingUp = () => {
  const [userLogin, setUserLogin] = useState(null);
  const [userMail, setUserMail] = useState(null);

  const { openModalAuth, userEmailVerified, setUserEmailVerified } =
    useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
        setUserMail(user.email);
        setUserEmailVerified(user.emailVerified);

        // Verificar cada cierto tiempo si el usuario ha verificado su correo
        const intervalId = setInterval(async () => {
          await user.reload(); // Recarga la información del usuario
          if (user.emailVerified) {
            setUserEmailVerified(true);
            clearInterval(intervalId); // Detiene el intervalo cuando se verifica
          }
        }, 60000); // Intervalo de 3 segundos

        return () => clearInterval(intervalId); // Limpieza al desmontar el componente
      } else {
        setUserLogin(null);
        setUserEmailVerified(false);
      }
    });

    return () => unsubscribe();
  }, [setUserEmailVerified]);

  const [isOpenLogin, modalLogin, closeModalLogin] = useModal(false);

  const handleLogIn = () => {
    openModalAuth();
  };

  const handleLogOut = () => {
    auth.signOut().then(() => {
      setUserLogin(null);
      setUserEmailVerified(false);
      closeModalLogin();
    });
  };

  const [isOpenChangePassword, modalChangePassword, closeModalChangePassword] =
    useModal(false);

  const handleModalChange = () => {
    modalChangePassword(true);
  };

  return (
    <header className="header">
      <div className="header-container">
        <LogoNav />

        {userLogin ? (
          <div className="user-logeado-div">
            {userMail ? (
              <h5>
                Bienvenido: <br />
                {userMail}
              </h5>
            ) : (
              <p>Cargando correo...</p>
            )}
            {userEmailVerified ? (
              <h5 className="user-verified">Usuario verificado.</h5>
            ) : (
              <h5 className="user-no-verified">
                Verifique su usuario desde su correo electronico.
              </h5>
            )}
            <button
              className="change-password-btn"
              onClick={() => handleModalChange()}
            >
              <u>Cambiar contraseña</u>
            </button>
            <button className="singup-btn" onClick={handleLogOut}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div>
            <button className="iniciar-sesion" onClick={handleLogIn}>
              Iniciar Sesión
            </button>
          </div>
        )}

        <ModalUserLogin
          isOpenModal={isOpenLogin}
          closeModal={closeModalLogin}
        />
        <ModalChangePassword
          isOpenModal={isOpenChangePassword}
          closeModal={closeModalChangePassword}
        />
      </div>
    </header>
  );
};

export default HeaderSingUp;
