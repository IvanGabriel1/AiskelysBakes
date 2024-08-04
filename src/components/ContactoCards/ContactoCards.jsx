import React from "react";
import "./contactocards.css";

const ContactoCards = () => {
  const cardNumeroTel = "(+54) 11-59785291",
    cardUbicacion = "Villa del Parque, CABA, Buenos Aires",
    cardMail = "ivangabraun@gmail.com",
    cardInstagram = "";

  return (
    <section>
      <section id="contacto" className="section">
        <article className="contact-cards-container">
          <div className="card-contact">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2007 1.05698L16.732 0.0257271C16.2464 -0.0859916 15.748 0.167524 15.5503 0.622993L13.4878 5.43549C13.3074 5.85659 13.4277 6.35073 13.7843 6.63862L16.3882 8.76987C14.8413 12.0656 12.1386 14.807 8.77415 16.3839L6.6429 13.78C6.35071 13.4234 5.86087 13.3031 5.43977 13.4835L0.627273 15.546C0.167507 15.748 -0.0860087 16.2464 0.02571 16.732L1.05696 21.2007C1.16438 21.6648 1.57688 21.9999 2.06243 21.9999C13.0667 21.9999 21.9999 13.0839 21.9999 2.06245C21.9999 1.5812 21.6691 1.1644 21.2007 1.05698Z"
                fill="#4F024C"
              />
            </svg>
            <h4>Teléfono</h4>
            <small>
              <a href={`tel:${cardNumeroTel}`} className="card-serv-decoration">
                {cardNumeroTel}
              </a>
            </small>
          </div>

          <div className="card-contact">
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6818 5.70738L4.00032 13.1651V21.2142C4.00032 21.4226 4.07055 21.6225 4.19556 21.7698C4.32058 21.9172 4.49013 22 4.66693 22L9.33574 21.9858C9.51196 21.9847 9.68066 21.9015 9.80495 21.7542C9.92925 21.607 9.99902 21.4077 9.99902 21.2V16.4994C9.99902 16.291 10.0693 16.0911 10.1943 15.9437C10.3193 15.7964 10.4888 15.7136 10.6656 15.7136H13.3321C13.5089 15.7136 13.6785 15.7964 13.8035 15.9437C13.9285 16.0911 13.9987 16.291 13.9987 16.4994V21.1965C13.9984 21.2999 14.0155 21.4024 14.0489 21.498C14.0822 21.5936 14.1313 21.6805 14.1932 21.7538C14.2552 21.827 14.3287 21.8851 14.4097 21.9247C14.4908 21.9644 14.5776 21.9848 14.6653 21.9848L19.3325 22C19.5093 22 19.6788 21.9172 19.8038 21.7698C19.9289 21.6225 19.9991 21.4226 19.9991 21.2142V13.1597L12.3193 5.70738C12.229 5.62159 12.1165 5.57481 12.0005 5.57481C11.8846 5.57481 11.7721 5.62159 11.6818 5.70738ZM23.8155 10.7763L20.3324 7.39194V0.589351C20.3324 0.433046 20.2797 0.283142 20.186 0.172617C20.0922 0.0620923 19.965 0 19.8324 0H17.4993C17.3667 0 17.2395 0.0620923 17.1458 0.172617C17.052 0.283142 16.9993 0.433046 16.9993 0.589351V4.15542L13.2692 0.537783C12.9112 0.190547 12.462 0.000694131 11.9985 0.000694131C11.5349 0.000694131 11.0857 0.190547 10.7277 0.537783L0.181444 10.7763C0.130818 10.8256 0.0889323 10.8862 0.0581813 10.9546C0.0274303 11.023 0.00841634 11.0979 0.00222573 11.175C-0.00396488 11.2521 0.00278923 11.3299 0.0221021 11.4039C0.0414151 11.4779 0.0729083 11.5466 0.114782 11.6063L1.1772 13.1288C1.21896 13.1886 1.27033 13.2382 1.32835 13.2746C1.38638 13.3111 1.44994 13.3336 1.51538 13.3411C1.58082 13.3485 1.64686 13.3407 1.70973 13.318C1.77259 13.2953 1.83104 13.2582 1.88173 13.2088L11.6818 3.69376C11.7721 3.60797 11.8846 3.56119 12.0005 3.56119C12.1165 3.56119 12.229 3.60797 12.3193 3.69376L22.1198 13.2088C22.1704 13.2582 22.2287 13.2953 22.2915 13.3181C22.3543 13.3409 22.4202 13.3488 22.4856 13.3415C22.551 13.3342 22.6145 13.3118 22.6726 13.2756C22.7306 13.2393 22.782 13.1899 22.8239 13.1303L23.8863 11.6078C23.9281 11.5478 23.9595 11.4786 23.9786 11.4043C23.9976 11.33 24.0041 11.2519 23.9975 11.1747C23.9909 11.0974 23.9714 11.0224 23.9402 10.9541C23.909 10.8857 23.8666 10.8253 23.8155 10.7763Z"
                fill="#4F024C"
              />
            </svg>
            <h4>Ubicación</h4>
            <small>{cardUbicacion}</small>
          </div>

          <div className="card-contact">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5832 5.94375C21.7508 5.79844 22 5.93437 22 6.16406V15.75C22 16.9922 21.0762 18 19.9375 18H2.0625C0.923828 18 0 16.9922 0 15.75V6.16875C0 5.93438 0.244922 5.80312 0.416797 5.94844C1.3793 6.76406 2.65547 7.8 7.03828 11.2734C7.94492 11.9953 9.47461 13.5141 11 13.5047C12.534 13.5188 14.0937 11.9672 14.966 11.2734C19.3488 7.8 20.6207 6.75938 21.5832 5.94375ZM11 12C11.9969 12.0188 13.432 10.6313 14.1539 10.0594C19.8559 5.54531 20.2898 5.15156 21.6047 4.02656C21.8539 3.81562 22 3.4875 22 3.14062V2.25C22 1.00781 21.0762 0 19.9375 0H2.0625C0.923828 0 0 1.00781 0 2.25V3.14062C0 3.4875 0.146094 3.81094 0.395312 4.02656C1.71016 5.14687 2.14414 5.54531 7.84609 10.0594C8.56797 10.6313 10.0031 12.0188 11 12Z"
                fill="#4F024C"
              />
            </svg>

            <h4>Email</h4>
            <small>
              <a href={`mailto:${cardMail}`} className="card-serv-decoration">
                {cardMail}
              </a>
            </small>
          </div>

          <div className="card-contact">
            <a
              href="https://instagram.com"
              target="_blank"
              className="card-serv-decoration"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0025 5.35948C7.88098 5.35948 5.36319 7.87783 5.36319 11C5.36319 14.1222 7.88098 16.6405 11.0025 16.6405C14.1239 16.6405 16.6417 14.1222 16.6417 11C16.6417 7.87783 14.1239 5.35948 11.0025 5.35948ZM11.0025 14.6671C8.98528 14.6671 7.3362 13.0225 7.3362 11C7.3362 8.97746 8.98037 7.33292 11.0025 7.33292C13.0245 7.33292 14.6687 8.97746 14.6687 11C14.6687 13.0225 13.0196 14.6671 11.0025 14.6671V14.6671ZM18.1877 5.12875C18.1877 5.8602 17.5988 6.44438 16.8724 6.44438C16.1411 6.44438 15.5571 5.85529 15.5571 5.12875C15.5571 4.40221 16.146 3.81312 16.8724 3.81312C17.5988 3.81312 18.1877 4.40221 18.1877 5.12875ZM21.9227 6.46402C21.8393 4.70166 21.4368 3.14058 20.146 1.8544C18.8601 0.568225 17.2994 0.165681 15.5374 0.0773179C13.7215 -0.0257726 8.27853 -0.0257726 6.46258 0.0773179C4.70552 0.160772 3.14479 0.563316 1.85399 1.84949C0.56319 3.13567 0.165644 4.69675 0.0773006 6.45911C-0.0257669 8.27547 -0.0257669 13.7196 0.0773006 15.536C0.160736 17.2983 0.56319 18.8594 1.85399 20.1456C3.14479 21.4318 4.70061 21.8343 6.46258 21.9227C8.27853 22.0258 13.7215 22.0258 15.5374 21.9227C17.2994 21.8392 18.8601 21.4367 20.146 20.1456C21.4319 18.8594 21.8344 17.2983 21.9227 15.536C22.0258 13.7196 22.0258 8.28037 21.9227 6.46402V6.46402ZM19.5767 17.4849C19.1939 18.4471 18.4528 19.1883 17.4859 19.5761C16.038 20.1505 12.6025 20.018 11.0025 20.018C9.40245 20.018 5.96196 20.1456 4.51902 19.5761C3.55705 19.1932 2.81595 18.452 2.42822 17.4849C1.85399 16.0367 1.9865 12.6004 1.9865 11C1.9865 9.39964 1.8589 5.95838 2.42822 4.51512C2.81104 3.55294 3.55215 2.81167 4.51902 2.42385C5.96687 1.84949 9.40245 1.98204 11.0025 1.98204C12.6025 1.98204 16.0429 1.8544 17.4859 2.42385C18.4479 2.80676 19.189 3.54803 19.5767 4.51512C20.1509 5.96329 20.0184 9.39964 20.0184 11C20.0184 12.6004 20.1509 16.0416 19.5767 17.4849Z"
                  fill="#4F024C"
                />
              </svg>
            </a>

            <h4>Instagram</h4>

            <small>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="card-serv-decoration"
              >
                Seguínos!
              </a>
            </small>
          </div>
        </article>
      </section>
    </section>
  );
};

export default ContactoCards;
