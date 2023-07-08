import React from "react";
import { Body, Header } from "./components";
import { CityContext } from "./states/CityContext";

function getLocale() {
  if(JSON.parse(localStorage.getItem("mode"))) {
    document.querySelector("body").setAttribute("data-dark", "dark");
  } else {
    document.querySelector("body").removeAttribute("data-dark");
  }
  if(localStorage.getItem("mode")) {
    return JSON.parse(localStorage.getItem("mode"));
  }
  return null;
}

const App = () => {
  const [city, setCity] = React.useState("London");
  const [days, setDays] = React.useState(7);
  const [theme, setTheme] = React.useState(getLocale());

  const values = {
    city,
    setCity,
    days,
    setDays,
    theme,
    setTheme
  };

  return (
    <CityContext.Provider value={values}>
      <Header />
      <Body />
    </CityContext.Provider>
  );
};

export default App;
