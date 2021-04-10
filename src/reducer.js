//initialState   (eg of basket)
//&
//reducer

export const initialState = {
  basket: [], //Initial state of basket is 0
  //and then the items will start appending and the number will be displayed from basket.length where the nav is
  user: null,
};

// ! Selector for the subtotal
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
//Accumalating all the prices to the original amount starting with 0

const reducer = (state, action) => {
  console.log(action); //IMPORTANT

  switch (action.type) {
    //! IMPORTANT: TO EVERY ACTION THAT WE LISTEN TO WE'VE TO RETURN HOW THE NEW STATE LOOKS LIKE
    //! Always return first the original state and then the changed part in that case

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'ADD_TO_BASKET':
      //*WHEN THIS ACTION COMES IN DO THIS
      //*AND NOW LOGIC FOR ADDING ITEM TO BASKET

      return {
        ...state, //Without changing the state i.e <<Original state>>
        basket: [...state.basket, action.item], //Only Change the basket part of state --> by adding the action.item (see from console) to the basket array
      };

    case 'REMOVE_FROM_BASKET':
      //*WHEN THIS ACTION COMES IN DO THIS
      //*AND NOW LOGIC FOR REMOVING ITEM TO BASKET

      //we cloned the basket
      let newBasket = [...state.basket];

      //we check to see if product exists
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        //item exists in basket, remove it
        newBasket.splice(index, 1); //Chopped off a value this is the replica of ne basket
      } else {
        console.warn(
          `Can't remove product (id:${action.id}) as it is not in the basket`
        );
      }
      return { ...state, basket: newBasket }; //<<Original state>> but set the basket with the new basket

    default:
      return state;
  }
};

export default reducer;
