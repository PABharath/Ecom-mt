// StripeContext.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NZ8O0SII7pguLOZyXrsXLAaaK04XwK5MXOTW4KqLGNT9TJJfEICTL4d8F8q6TRl0npDALXbafmRCKSTNUSJjuiU00hWoo6wif');

const StripeContext = React.createContext();

export const useStripeContext = () => {
  return React.useContext(StripeContext);
};

export const StripeProvider = ({ children }) => {
  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  );
};
