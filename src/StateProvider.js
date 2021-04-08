//setup data layer
//We need this to track the basket

import React, { createContext, useContext, useReducer } from 'react';

//THIS IS THE DATA LAYER
export const StateContext = createContext();

//BUILD A PROVIDER
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//THIS IS HOW YOU USE IT INSIDE OF A COMPONENT
export const useStateValue = () => useContext(StateContext);

// The final thingie useStateValue
