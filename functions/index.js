const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51IeD9DSGcevQvo9haBzuXcihCIu7dNqech77uRo9VUjA0VJW1imd5AjMZ7mYPb134Aw1AjTfbJnh5orNpqlGodpR00k3ksAtGc'
);

//API -- Setup needed to get the backend express app running on a cloud function

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json()); //send data and pass in the json format

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world')); //at '/'

//url: `/payments/create?total=${getbasketTotal(basket) * 100}`, <-- we used in payment.js
// eslint-disable-next-line
app.post('/payments/create', async (request, response) => {
  const total = request.query.total; //query param (total amount in subunits)

  //Debug to see we get the total accessed on this param
  console.log('Payment Request Recieved BOOM!!! for this amount >>>', total);
  console.log(total);

  // paymentIntent = payment confirmation in stripes
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of currency
    currency: 'usd',
  });

  // 201 = Payment Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/clone-1c3e2/us-central1/api
