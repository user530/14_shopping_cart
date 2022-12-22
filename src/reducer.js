const reducer = (state, action) => {
  switch (action?.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE_CART_ITEM": {
      const newCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      return {
        ...state,
        cart: newCart,
      };
    }

    case "CHANGE_ITEM_AMOUNT": {
      let newCart = state.cart.map((cartItem) =>
        cartItem.id === action.payload.id
          ? action.payload.type === "INCREASE"
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : { ...cartItem, amount: cartItem.amount - 1 }
          : cartItem
      );

      newCart = newCart.filter((cartItem) => cartItem.amount > 0);

      return { ...state, cart: newCart };
    }

    case "GET_TOTAL": {
      let { total, amount } = state.cart.reduce(
        (totalObj, item) => {
          return {
            total: (totalObj.total += item.price * item.amount),
            amount: (totalObj.amount += item.amount),
          };
        },
        { total: 0, amount: 0 }
      );

      total = parseFloat(total).toFixed(2);

      return { ...state, total, amount };
    }

    case "LOAD_CART_DATA":
      return { ...state, loading: true };

    case "DISPLAY_CART_ITEMS":
      return { ...state, cart: action.payload.cart, loading: false };

    default:
      throw new Error("Reducer Error: No matching action type!");
  }
};

export default reducer;
