import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage8 from "../../img/italy.jpg";
import rigoImage9 from "../../img/usa.jpg";
import rigoImage10 from "../../img/german.jpg";
import { object } from "prop-types";
import { element } from "prop-types";

export const Information = ({ rec }) => {

  var rec = useLocation().state;
  const { store, actions } = useContext(Context);
  const [language, setLanguage] = useState("");
  const [ingredients, setingredients] = useState("");
  const [icon, setIcon] = useState(false);
  const [addFav, setAddFav] = useState(0);
  const [colorButton, setColorButton] = useState("buttonList");
  const params = useParams();

  const drinkObjArray = [];

  for (const key in rec) {
    if (rec[key] != null) drinkObjArray.push({ [key]: rec[key] });
  }

  let ingredientes = [];

  drinkObjArray.forEach((item) => {
    for (let key in item) {
      if (key.includes("Ingredient") && item[key] != null) {
        ingredientes.push(item[key]);
      }
    }
  });

  let medidas = [];

  drinkObjArray.forEach((item) => {
    for (let key in item) {
      if (key.includes("Measure") && item[key] != null) {
        medidas.push(item[key]);
      }
    }
  });

  // store.shoppingList.forEach((item) => {
  //   if (rec.idDrink != item.drink_id) {
  //     alert("Haz lo tuyo");
  //   } else {
  //     console.log("Esa bebida ya existe");
  //   }
  // });

  // const ingIds = store.shoppingList.filter(
  //   (item) => item.drink_id === rec.idDrink
  // );

  console.log("rec", rec);
  // console.log(store.recipe);


  return (
    <div className="container-fluid mt-3">
      <div
        className="card1 mb-3"
        style={{ maxWidth: "1100px", boxShadow: "2px 8px 17px #0F0C24" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={rec.strDrinkThumb}
              className="img-fluid rounded-start"
              alt="..."
              style={{ width: "auto", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 class="card-title border-bottom border-dark">
                {rec.strDrink}
              </h5>
              <p className="card-text border-bottom border-dark">
                Instructions:{" "}
                {language == "italian"
                  ? rec.strInstructionsIT
                  : language == "german"
                    ? rec.strInstructionsDE
                    : rec.strInstructions}
              </p>
              <h3>Ingredients</h3>

              <ul className="list-group">
                {ingredientes.map((ing, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      <strong>{ing}</strong>
                      <span>: </span>
                      {medidas[index] ? medidas[index] : "As desired"}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="d-flex justify-content-end">
              <div className="m-2">
                {rec.strInstructionsIT && language != "italian" && (
                  <img
                    src={rigoImage8}
                    style={{
                      width: "60px",
                      height: "auto",
                      borderRadius: "40px",
                    }}
                    onClick={() => {
                      setLanguage("italian");
                    }}
                  />
                )}
                {language != "" && (
                  <img
                    src={rigoImage9}
                    style={{
                      width: "60px",
                      height: "auto",
                      borderRadius: "40px",
                    }}
                    onClick={() => {
                      setLanguage("");
                    }}
                    className=""
                  />
                )}
              </div>
              <div className="m-2">
                {rec.strInstructionsDE && language != "german" && (
                  <img
                    src={rigoImage10}
                    style={{
                      width: "60px",
                      height: "auto",
                      borderRadius: "40px",
                    }}
                    onClick={() => {
                      setLanguage("german");
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className={colorButton == "buttonList" ? "button" : "buttonList"}
          onClick={function () {
            actions.addToShopingList(rec.idDrink, rec.strDrink, ingredientes);
            setColorButton("button");
          }}
          style={{ width: "auto", height: "auto", margin: "10px" }}
        >
          Add to Shopping List
        </button>
        <Link to="/shopinglist">
          <button
            className={colorButton == "buttonList" ? "button" : "buttonList"}
            style={{ width: "auto", height: "auto", margin: "10px" }}
          >
            Check Your Shopping List
          </button>
        </Link>
        <Link to="/recipeBrowser" className="text-decoration-none">
          <button
            className="button "
            style={{ width: "auto", height: "auto", margin: "10px" }}
          >
            Search More Drinks!
          </button>
        </Link>
        {/* <input type='number' value='number' className="rounded-3" style={{ width: '5rem' }} ></input> */}
      </div>
    </div>
  );
};

Information.propTypes = {
  match: PropTypes.object,
};
