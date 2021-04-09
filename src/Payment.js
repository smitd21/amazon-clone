import { React, useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getbasketTotal } from './reducer';

function Payment() {
  const [{ user, basket }] = useStateValue();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // Will run once this payment component loads and also when the dependency changes
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer

    //!Important snippet
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //*Stripe expects the total in a currencies subunits
        //*If  dollars it expects you to pass the total amount in cents (thats why *100)
        url: `/payments/create?total=${getbasketTotal(basket)} * 100`,
      });
      setClientSecret(response.data.clientSecret);
    };
  }, [basket]);

  //* Two powerful hooks to implement our Stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // do all the fancy stripe stuff...
    e.preventDefault();
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

        //Everything goes good then
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replaceState('/orders');
      });
  };

  const handleChange = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setDisabled(e.empty); //if event empty go ahead and disable the button
    setError(e.error ? e.error.message : ''); //if error show error otherwise nothing
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
                  value={getbasketTotal(basket)}
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
