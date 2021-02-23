require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ejs = require('ejs');

// View engine
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static('public'));

// Home route
app.get('/checkout', (req, res) => {
  res.render('checkout.html');
});

// Cancel route
app.get('/cancel', (req, res) => {
  res.render('cancel.html');
});

// Success route
app.get('/success', (req, res) => {
  res.render('success.html');
});

// Checkout post route
app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ id: session.id });
});

// Port
app.listen(3000, () => console.log('Server running on port 3000'));
