// Create an instance of the Stripe object with your publishable API key
const stripe = Stripe(
  'pk_test_51INNm9HHHlkkraI73ICsnoVVnn1rhctRa6Gak8mrJDDurJEYzSNm4f1lDzxj9sjDRfgfxNUAIJgnKSCwxAy5bJbM006myA9dLx'
);

const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
  fetch('/checkout', {
    method: 'POST',
  })
    .then((response) => {
      return response.json();
    })
    .then((session) => {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
