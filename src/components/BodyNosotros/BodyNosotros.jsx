import "./bodynosotros.css";
import heroNosotros from "../../assets/hero-nosotros.jpeg";
import HeroImage from "../HeroImage/HeroImage";
import imgMision from "../../assets/MisionNosotrosImg.jpeg";
import imgNosotros from "../../assets/Nosotros-Img.jpeg";
import imgValores from "../../assets/ValoresNosotrosImg.jpeg";
import FollowUs from "../FollowUs/FollowUs";

const BodyNosotros = () => {
  return (
    <>
      <HeroImage
        img={heroNosotros}
        text1={"Nosotros"}
        text2={"Cocina casera y familiar!"}
      />

      <div className="body-nosotros-container">
        <h2 className="title">Conocénos!</h2>
        <div className="articles-nosotros-container">
          <article>
            <h2>Historia</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              consectetur quibusdam velit, culpa porro eveniet quaerat quidem
              cum rem harum maiores atque, exercitationem at sit placeat fuga
              sed ipsum reprehenderit!
            </p>
          </article>
          <img
            src={imgNosotros}
            alt="Imagen sobre nosotros"
            className="imgNosotros"
          />

          <article>
            <h2>Misión</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              suscipit cumque eos quia. Sequi, officia! Error ipsam hic nihil
              voluptatum quaerat minus voluptate, provident qui, veritatis,
              atque eius velit unde.
            </p>
          </article>

          <img
            src={imgMision}
            alt="Imagen nuestra mision"
            className="imgNosotros"
          />

          <article>
            <h2>Valores</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              suscipit cumque eos quia. Sequi, officia! Error ipsam hic nihil
              voluptatum quaerat minus voluptate, provident qui, veritatis,
              atque eius velit unde.
            </p>
          </article>

          <img
            src={imgValores}
            alt="Imagen nuestra mision"
            className="imgNosotros"
          />
        </div>
        <FollowUs />
      </div>
    </>
  );
};

export default BodyNosotros;
