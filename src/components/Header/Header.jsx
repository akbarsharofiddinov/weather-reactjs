import React from "react";
import classes from "./Header.module.scss";
import { logo, mode } from "../../assets/images/header-images/";
import { useCityContext } from "../../hooks/useCityContext";

const Header = () => {

  const { city, setCity, setDays, theme, setTheme } = useCityContext();

  const handleCity = (e) => {
    setCity(e.target.value);
    setDays(7);
  }

  const handleMode = () => {
    console.log(theme);
    if(theme) {
      localStorage.setItem("mode", false);
      setTheme(JSON.parse(localStorage.getItem("mode")));
    }else {
      localStorage.setItem("mode", true);
      setTheme(JSON.parse(localStorage.getItem("mode")));
    }
  }

  return (
    <div className={classes.header}>
      <div className="container">
        <div className={classes.headerInner}>
          <a href="/" className={classes.logoLink}>
            <img src={logo} />
            React weather
          </a>
          <div className={classes.headerAction}>
            <button className={classes.modeBtn} onClick={handleMode}>
              <img src={mode} />
            </button>
            <select className={classes.select} value={city} onChange={handleCity}>
              <option value="" disabled>
                Выбрать город
              </option>
              <option value="russia">Russia</option>
              <option value="london">London</option>
              <option value="uzbekistan">Uzbekistan</option>
              <option value="japan">Japan</option>
              <option value="korea">Korea</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
