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

    case "INCREASE_ITEM_AMOUNT": {
      const newCart = state.cart.map((cartItem) =>
        cartItem.id !== action.payload.id
          ? cartItem
          : { ...cartItem, amount: cartItem.amount + 1 }
      );

      return { ...state, cart: newCart };
    }

    case "DECREASE_ITEM_AMOUNT": {
      const newCart = state.cart
        .map((cartItem) =>
          cartItem.id !== action.payload.id
            ? cartItem
            : { ...cartItem, amount: cartItem.amount - 1 }
        )
        .filter((cartItem) => cartItem.amount > 0);

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
  }

  return state;
};

export default reducer;
