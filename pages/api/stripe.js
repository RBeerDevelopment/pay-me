const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
    const { amount, description } = req.query;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    unit_amount: parseFloat(amount) * 100,
                    product_data: { name: description },
                    currency: 'eur',
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_FAILURE_URL,
    });

    res.status(200).json({ url: session.url });
}
