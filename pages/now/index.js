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
                        href={`${process.env.NEXT_PUBLIC_PAYPAL_ME_BASE_URL}/${amount}`}
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
    const { amount, description } = context.query;
    const res = await fetch(
        `http://localhost:3000/api/stripe?amount=${amount}&description=${description}`
    );
    const data = await res.json();

    return {
        props: {
            stripeCheckoutUrl: data.url,
        },
    };
}
