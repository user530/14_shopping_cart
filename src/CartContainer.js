import React from "react";
import { useAppContext } from "./context";
import CartItem from "./CartItem";

export default function CartContainer() {
  const { cart, total, clearCart } = useAppContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>Your shopping cart</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  } else
    return (
      <section className="cart">
        <header>
          <h2>Your shopping cart</h2>
        </header>
        <div>
          {cart.map((itemObj) => (
            <CartItem key={itemObj.id} {...itemObj} />
          ))}
        </div>
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total
              <span>${total}</span>
            </h4>
          </div>
          <button className="btn clear-btn" onClick={clearCart}>
            Clear cart
          </button>
        </footer>
      </section>
    );
}
