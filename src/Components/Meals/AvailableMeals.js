import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import LoadingScreen from "../UI/LoadingScreen";

const fetchDataArray = [];

const AvailableMeals = () => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://meal-items-27510-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Somethink went wrong!");
        }

        const data = await response.json();

        for (const key in data) {
          fetchDataArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
          console.log(fetchDataArray);
          setError("");
          setDataAvailable(true);
        }
      } catch (Error) {
        console.log(Error);
        setError(Error.toString());
      }
    };

    fetchData();
  }, []);

  const mealsList = fetchDataArray.map((data) => {
    return (
      <MealItem
        id={data.id}
        name={data.name}
        key={data.id}
        description={data.description}
        price={data.price}
      />
    );
  });

  let renderedComponent;

  if (dataAvailable === false && error.length === 0) {
    renderedComponent = <LoadingScreen />;
  } else if (dataAvailable === true) {
    renderedComponent = <ul>{mealsList}</ul>;
  } else {
    renderedComponent = (
      <div className={classes.error}>
        <div>Error</div>
        <div className={classes.errorText}>Somethink went wrong!</div>
        <div className={classes.errorText}>{error}</div>
      </div>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{renderedComponent}</Card>
    </section>
  );
};

export default AvailableMeals;
