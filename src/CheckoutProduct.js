import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, imageSrc, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //remove item from basket and for that we just need the id
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={imageSrc} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {/* JS technqiue to show number of stars of the given number */}
          {Array(rating)
            // Create array with the rating no of elements in it
            .fill()
            //   Fill it with empty values in this array
            .map((_) => (
              //  _ means IDC what the value is
              //  Map that many no of stars
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
