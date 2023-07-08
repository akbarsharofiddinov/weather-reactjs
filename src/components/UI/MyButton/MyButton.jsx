import React from "react";
import classes from "./MyButton.module.scss";

const MyButton = (props) => {
  return (
    <button {...props} className={classes.myBtn}>
      {props.children}
    </button>
  );
};

export default MyButton;
