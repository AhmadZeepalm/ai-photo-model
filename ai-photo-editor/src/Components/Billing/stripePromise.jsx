// stripePromise.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

export default stripePromise;
