import React from "react";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const removeCartItem = (id) =>
    dispatch({ type: "REMOVE_CART_ITEM", payload: { id } });

  const changeAmount = (id, type) => {
    dispatch({ type: "CHANGE_ITEM_AMOUNT", payload: { id, type } });
  };

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
        changeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
