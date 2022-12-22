import React from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const removeCartItem = (id) =>
    dispatch({ type: "REMOVE_CART_ITEM", payload: { id } });

  const increaseItemAmount = (id) =>
    dispatch({ type: "INCREASE_ITEM_AMOUNT", payload: { id } });

  const decreaseItemAmount = (id) =>
    dispatch({ type: "DECREASE_ITEM_AMOUNT", payload: { id } });

  const fetchData = async (url) => {
    dispatch({ type: "LOAD_CART_DATA" });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({ type: "DISPLAY_CART_ITEMS", payload: { cart } });
  };

  React.useEffect(() => {
    fetchData(url);
  }, []);

  React.useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCartItem,
        increaseItemAmount,
        decreaseItemAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
