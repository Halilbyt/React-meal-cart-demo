import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals App</h1>
        <HeaderCartButton onClick={props.onCartShow} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={
            "https://www.authenticfoodquest.com/wp-content/uploads/2022/01/1200_BestCulinaryDestinationsinTheWorldOnaPlate_AuthenticFoodQuest.jpg"
          }
          alt="Meals"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
