import React, { useState } from 'react';
import stripePromise from './stripePromise'; 
const Billing = () => {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const session = await response.json();

            if (session.id) {
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
                if (error) {
                    setError(error.message);
                }
            } else {
                setError('Failed to create a checkout session.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Setup Your Billing</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <button type="submit">Setup Your Billing</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Billing;
