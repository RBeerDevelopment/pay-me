import Footer from '@components/footer/Footer';
import NavBar from '@components/navBar/NavBar';
import CopyableText from '@components/copyableText/CopyableText';
import DetailsCard from '@components/detailsCard/DetailsCard';

import { useRouter } from 'next/router';

import React from 'react';

import { girocode } from 'iban-qr-code';

const QRCode = require('qrcode.react');

export default function MainComponent() {
    const router = useRouter();

    const name = process.env.NEXT_PUBLIC_NAME;
    const iban = process.env.NEXT_PUBLIC_IBAN;
    const bic = process.env.NEXT_PUBLIC_BIC;

    const { amount, description } = router.query;

    const qrData = girocode({
        name,
        iban,
        bic,
        currency: 'EUR',
        amount: `${amount}`,
        char: '', // Purpose of the Credit Transfer (AT-44)
        ref: '', // ISO 11649 RF Creditor Reference may be used here
        reason: `${description}`,
        hint: '', // note to user,
        version: '001', // Version of Quick Response Code 001 or 002
    });

    return (
        <div className='min-h-screen mb-auto bg-gray-200'>
            <NavBar />
            <main className='bg-gray-200 h-auto w-full flex flex-col flex-wrap justify-around content-center'>
                <DetailsCard amount={amount} description={description} />
                <div className='bg-white w-80 mx-12 mb-8 p-8 space-y-0 rounded-md content-center flex flex-col flex-wrap'>
                    <p className='text-center text-4xl font-bold mb-8'>SEPA</p>

                    <p className='font-bold'>Name:</p>
                    <CopyableText text={name} />

                    <p className='font-bold'>IBAN:</p>
                    <CopyableText text={iban} />

                    <p className='font-bold'>BIC:</p>
                    <CopyableText text={bic} />
                    <div className='flex flex-col flex-wrap justify-around content-center pt-4'>
                        <QRCode value={qrData} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
