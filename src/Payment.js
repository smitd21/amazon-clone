import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue(); //*Our Data Layers used
  const history = useHistory();

  //* Two powerful hooks to implement our Stripe
  const stripe = useStripe();
  const elements = useElements();

  //state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //Create PaymentIntent as soon as the page loads
    //!Important snippet
    //*whenever the basket(dependency) changes it will make this request
    //*and it will update the special stripe secret which allows us to charge a customer the correct amount

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        //Stripe expects the total in a currencies subunits
        //If  dollars it expects you to pass the total amount in cents (thats why *100)
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log('THE SECRET IS >>>', clientSecret);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setDisabled(event.empty); //if event empty go ahead and disable the button
    setError(event.error ? event.error.message : ''); //if error show error otherwise nothing
  };

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    //a. clientSecret - stripe knows how much we're going to charge
    //b. payment_method - card
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), //c. find the card element
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation  -- this is what stripe call it
        console.log(paymentIntent);

        //Everything goes good then
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replaceState('/orders');
        //While doing payment stuff --> You don't want user to come back to payment page so u just swap by using replace instead of push
      });
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to={'/checkout'}>{basket?.length} items</Link>)
        </h1>
        {/* Payment srction - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment srction - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                imageSrc={item.imageSrc}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment srction - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Magic will go*/}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
