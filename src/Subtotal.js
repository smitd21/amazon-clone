import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const history = useHistory();
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
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button onClick={(e) => history.push('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
}
export default Subtotal;
