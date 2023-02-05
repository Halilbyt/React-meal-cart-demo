import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// helper function for form validation:
const isEmpty = (value) => value.trim() === "";
const isFiveDigit = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInput = useRef();
  const adressInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();
  const [formValidationResults, setFormValidationresults] = useState({
    name: true,
    adress: true,
    city: true,
    postalCode: true,
  });

  const btnCancelHandler = () => {
    props.onCancel();
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredAdress = adressInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    // validation of all input data
    const enteredNameValid = !isEmpty(enteredName);
    const enteredAdressValid = !isEmpty(enteredAdress);
    const enteredCityValid = !isEmpty(enteredCity);
    const enteredPostalCodeValid = isFiveDigit(enteredPostalCode);

    setFormValidationresults({
      name: enteredNameValid,
      adress: enteredAdress,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    const formInputsIsValid =
      enteredNameValid &&
      enteredAdressValid &&
      enteredCityValid &&
      enteredPostalCodeValid;

    if (!formInputsIsValid) {
      return;
    }

    const formObject = {
      name: enteredName,
      adress: enteredAdress,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };

    props.onConfirm(formObject);
  };

  return (
    <div className={classes.conteiner}>
      <form className={classes.formContainer} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            formValidationResults.name ? "" : classes.invalidInput
          }`}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInput} />
          {!formValidationResults.name && (
            <p className={classes.nameErr}>Please enter your name!</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formValidationResults.adress ? "" : classes.invalidInput
          }`}>
          <label htmlFor="adress">Adress</label>
          <input type="text" id="adress" ref={adressInput} />
          {!formValidationResults.adress && (
            <p className={classes.adressErr}>Please enter your adress!</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formValidationResults.postalCode ? "" : classes.invalidInput
          }`}>
          <label htmlFor="postal">Postal Code</label>
          <input type="number" id="postal" ref={postalCodeInput} />
          {!formValidationResults.postalCode && (
            <p className={classes.postCodeErr}>
              Please enter your Postal Code!
            </p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formValidationResults.city ? "" : classes.invalidInput
          }`}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInput} />
          {!formValidationResults.city && (
            <p className={classes.cityErr}>Please enter your City!</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="submit">Confirm</button>
          <button type="button" onClick={btnCancelHandler}>
            {" "}
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
