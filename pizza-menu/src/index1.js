import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = {color: "red", fontSize: "44px", textTransform: "uppercase"}
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Delicious Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const isEmpty = pizzaData.length > 0 ? false : true;
  // const isEmpty = true
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {!isEmpty ? (
        <>
          <p>
            Athentic Italian cuisine. 6 creative dishes to choose from. All from
            out stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObject={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <div>Sorry we are still preparing the menu</div>
      )}
    </main>
  );
}

function Pizza({ pizzaObject }) {
  console.log(pizzaObject);
  // if (pizzaObject.soldOut ) return null;
  return (
    <div className={`pizza ${pizzaObject.soldOut ? "sold-out" : "" }`} >
      <img src={pizzaObject.photoName} alt={pizzaObject.name} />
      <h2> {pizzaObject.name}</h2>
      <p>{pizzaObject.ingredients}</p>
      
      <span> {pizzaObject.soldOut ? (SOLD OUT) : ${pizzaObject.price}} </span>
      
    </div>
  );
}
function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        {" "}
        We are open from {openHour}:00 to {closeHour}:00 !{" "}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
function Footer() {
  let time = new Date().getHours();
  const openHour = 8;
  const closeHour = 21;
  const isOpen = time >= openHour && time <= closeHour;
  console.log(isOpen);
  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <div> We are close</div>
      )}
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
