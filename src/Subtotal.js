import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getbasketTotal } from './reducer';

function Subtotal() {
  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      {/* Price */}

      {/* This will perfectly handle the large amounts displaying  */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getbasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button>Proceed to Checkout</button>
    </div>
  );
}
export default Subtotal;