import Footer from '@components/footer/Footer';
import NavBar from '@components/navBar/NavBar';

import DetailsCard from '@components/detailsCard/DetailsCard';

import { useRouter } from 'next/router';

import React from 'react';

export default function MainComponent({ stripeCheckoutUrl }) {
    const router = useRouter();

    const { amount, description } = router.query;

    const redirectToStripe = () => {
        document.location.href = stripeCheckoutUrl;
    };

    const redirectToSepaPage = () => {
        router.push({
            pathname: 'sepa',
            query: { amount, description },
        });
    };

    return (
        <div className='min-h-screen mb-auto bg-gray-200'>
            <NavBar />
            <main className='bg-gray-200 h-auto w-full flex flex-col flex-wrap justify-around content-center'>
                <DetailsCard amount={amount} description={description} />
                <div className='bg-white w-80 mx-12 mb-8 p-8 space-y-4 rounded-md content-center flex flex-col flex-wrap'>
                    <p className=' text-center text-xl'>Pay with</p>
                    <a
                        href={`https://www.paypal.com/paypalme/${process.env.NEXT_PUBLIC_PAYPAL_ME_USERNAME}/${amount}`}
                        className='mt-2 px-4 py-2 rounded bg-paypal hover:bg-green-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-600 focus:ring-opacity-80 cursor-pointer'
                    >
                        PayPal
                    </a>
                    <a
                        onClick={redirectToStripe}
                        className='mt-20 px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-600 focus:ring-opacity-80 cursor-pointer'
                    >
                        Credit Card
                    </a>
                    <a
                        onClick={redirectToSepaPage}
                        className='mt-20 px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-600 focus:ring-opacity-80 cursor-pointer'
                    >
                        SEPA
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SK);

    const { amount, description } = context.query;

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

    return {
        props: {
            stripeCheckoutUrl: session.url,
        },
    };
}
