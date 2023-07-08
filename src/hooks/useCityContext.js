import React from "react";
import { CityContext } from "../states/CityContext";

export const useCityContext = () => {
  return React.useContext(CityContext);
}