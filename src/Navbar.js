import React from "react";
import { useAppContext } from "./context";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { amount } = useAppContext();

  return (
    <nav>
      <div className="nav-center">
        <h3>UseReducer</h3>
        <div className="nav-container">
          <FaShoppingCart style={{ fontSize: "30px" }} />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
