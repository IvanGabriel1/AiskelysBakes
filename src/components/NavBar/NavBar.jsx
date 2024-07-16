import { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/Logo.png";
import NavLinks from "../NavLinks/NavLinks";
import LogoNav from "../LogoNav/LogoNav";
import NavMobile from "../NavMobile/NavMobile";

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollThreshold = 126;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener(`scroll`, handleScroll);

    return () => {
      window.removeEventListener(`scroll`, handleScroll);
    };
  }, []);

  return (
    <>
      <LogoNav />

      <header className="navlinks-container-desktop">
        <img
          className={`logo ${isScroll ? "scrolled" : "no-scrolled"}`}
          src={logo}
          alt="logo de AiskelysBakes"
        />
        <NavLinks />
      </header>

      <NavMobile />
    </>
  );
};

export default NavBar;
