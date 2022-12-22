import React from "react";
import { useAppContext } from "./context";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function CartItem({ id, img, title, price, amount }) {
  const { removeCartItem, changeAmount } = useAppContext();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => removeCartItem(id)}>
          Remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => changeAmount(id, "INCREASE")}
        >
          <FaChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => changeAmount(id, "DECREASE")}
        >
          <FaChevronDown />
        </button>
      </div>
    </article>
  );
}
