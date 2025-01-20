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
  const [isOpenAccordionHeader, setIsOpenAccordionHeader] = useState(false);

  const [isOpenLogin, modalLogin, closeModalLogin] = useModal(false);

  const {
    openModalAuth,
    userEmailVerified,
    setUserEmailVerified,
    resendVerificationMail,
  } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLogin(user);
        setUserMail(user.email);
        setUserEmailVerified(user.emailVerified);

        try {
          // Recargar información del usuario solo cuando sea necesario
          await user.reload();
          if (user.emailVerified) {
            setUserEmailVerified(true);
          }
        } catch (error) {
          // console.error("Error al recargar el usuario:", error);
          if (error.code === "auth/user-token-expired") {
            // Manejo específico del error de token expirado
            // console.log(
            //   "El token del usuario ha caducado. Inicia sesión nuevamente."
            // );
            setUserLogin(null);
          }
        }
      } else {
        setUserLogin(null);
        setUserEmailVerified(false);
      }
    });

    return () => unsubscribe(); // Limpieza del listener
  }, []);

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

  const toggleAccordion = () =>
    setIsOpenAccordionHeader(!isOpenAccordionHeader);

  return (
    <header className="header">
      <div className="header-container">
        <div className="aviso-header">
          <p>Envios gratis a partir de $100!</p>
        </div>

        <section className="section-header">
          {userLogin ? (
            <div className="user-logeado-div">
              <button
                className={`header-accordion-button ${
                  isOpenAccordionHeader ? `open` : ``
                }`}
                onClick={toggleAccordion}
              >
                {userMail ? (
                  <div className="header-accordion-button-contenido">
                    {isOpenAccordionHeader ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    )}
                    <h5>
                      Bienvenido:
                      {userMail}
                    </h5>
                  </div>
                ) : (
                  <p>Cargando correo...</p>
                )}
              </button>
              <div
                className={`header-accordion-content ${
                  isOpenAccordionHeader ? `open` : ``
                }`}
              >
                {userEmailVerified ? (
                  <h5 className="user-verified">Usuario verificado.</h5>
                ) : (
                  <div className="user-no-verified-container">
                    <h5 className="user-no-verified">
                      Verifique su usuario desde su correo electronico.
                    </h5>

                    <button
                      className="btn-resend-emailverified"
                      onClick={() => resendVerificationMail()}
                    >
                      Reenviar mail
                    </button>
                  </div>
                )}
                <button
                  className="change-password-btn"
                  onClick={() => handleModalChange()}
                >
                  Cambiar contraseña
                </button>
                <button className="singup-btn" onClick={handleLogOut}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="iniciar-sesion-container">
              <button className="iniciar-sesion" onClick={handleLogIn}>
                <span className="iniciar-sesion-hover">🙋‍♀️</span>
                <u>Ingresar con usuario</u>
                <span className="iniciar-sesion-hover">🙋‍♂️</span>
              </button>

              <section className="iniciar-sesion-lg">
                <a
                  href={`tel: (+54) 11-59785291`}
                  className="card-serv-decoration-tel"
                >
                  📞 (+54) 11-59785291
                </a>
              </section>

              <section className="iniciar-sesion-extra-lg">
                <a
                  href={`tel: (+54) 11-59785291`}
                  className="card-serv-decoration-tel"
                >
                  📞 (+54) 11-59785291
                </a>
                <a
                  href={`mailto: ivangabraun@gmail.com`}
                  className="card-serv-decoration-email"
                >
                  <span className="card-serv-decoration-email-span1">✉️ </span>
                  ivangabraun@gmail.com
                  <span className="card-serv-decoration-email-span2"> 📩</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="card-serv-decoration-instagram"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0025 5.35948C7.88098 5.35948 5.36319 7.87783 5.36319 11C5.36319 14.1222 7.88098 16.6405 11.0025 16.6405C14.1239 16.6405 16.6417 14.1222 16.6417 11C16.6417 7.87783 14.1239 5.35948 11.0025 5.35948ZM11.0025 14.6671C8.98528 14.6671 7.3362 13.0225 7.3362 11C7.3362 8.97746 8.98037 7.33292 11.0025 7.33292C13.0245 7.33292 14.6687 8.97746 14.6687 11C14.6687 13.0225 13.0196 14.6671 11.0025 14.6671V14.6671ZM18.1877 5.12875C18.1877 5.8602 17.5988 6.44438 16.8724 6.44438C16.1411 6.44438 15.5571 5.85529 15.5571 5.12875C15.5571 4.40221 16.146 3.81312 16.8724 3.81312C17.5988 3.81312 18.1877 4.40221 18.1877 5.12875ZM21.9227 6.46402C21.8393 4.70166 21.4368 3.14058 20.146 1.8544C18.8601 0.568225 17.2994 0.165681 15.5374 0.0773179C13.7215 -0.0257726 8.27853 -0.0257726 6.46258 0.0773179C4.70552 0.160772 3.14479 0.563316 1.85399 1.84949C0.56319 3.13567 0.165644 4.69675 0.0773006 6.45911C-0.0257669 8.27547 -0.0257669 13.7196 0.0773006 15.536C0.160736 17.2983 0.56319 18.8594 1.85399 20.1456C3.14479 21.4318 4.70061 21.8343 6.46258 21.9227C8.27853 22.0258 13.7215 22.0258 15.5374 21.9227C17.2994 21.8392 18.8601 21.4367 20.146 20.1456C21.4319 18.8594 21.8344 17.2983 21.9227 15.536C22.0258 13.7196 22.0258 8.28037 21.9227 6.46402V6.46402ZM19.5767 17.4849C19.1939 18.4471 18.4528 19.1883 17.4859 19.5761C16.038 20.1505 12.6025 20.018 11.0025 20.018C9.40245 20.018 5.96196 20.1456 4.51902 19.5761C3.55705 19.1932 2.81595 18.452 2.42822 17.4849C1.85399 16.0367 1.9865 12.6004 1.9865 11C1.9865 9.39964 1.8589 5.95838 2.42822 4.51512C2.81104 3.55294 3.55215 2.81167 4.51902 2.42385C5.96687 1.84949 9.40245 1.98204 11.0025 1.98204C12.6025 1.98204 16.0429 1.8544 17.4859 2.42385C18.4479 2.80676 19.189 3.54803 19.5767 4.51512C20.1509 5.96329 20.0184 9.39964 20.0184 11C20.0184 12.6004 20.1509 16.0416 19.5767 17.4849Z"
                      fill="#E1306C"
                    />
                  </svg>
                  {` `}
                  Instagram
                </a>
              </section>
            </div>
          )}
        </section>

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
