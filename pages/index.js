import Footer from '@components/footer/Footer';
import NavBar from '@components/navBar/NavBar';

import Input from '@components/input/Input';

import { useRouter } from 'next/router';

import React, { useState } from 'react';

export default function MainComponent() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0.0);

    const [descriptionError, setDescriptionError] = useState('');
    const [amountError, setAmountError] = useState('');

    const isDescriptionValid = () => {
        return (
            description !== null &&
            description !== undefined &&
            description !== '' &&
            description.length < 150
        );
    };

    const isAmountValid = () => {
        return amount !== null && amount !== undefined && !isNaN(amount);
    };

    const handleButtonClick = () => {
        if (!isDescriptionValid()) {
            setDescriptionError('Please enter a valid description');
            return;
        }
        if (!isAmountValid()) {
            setAmountError('Please enter a valid amount');
            return;
        }

        router.push({
            pathname: 'now',
            query: { amount, description },
        });
    };
    return (
        <div className='min-h-screen mb-auto bg-gray-200'>
            <NavBar />
            <main className='bg-gray-200 h-auto w-full flex flex-row flex-wrap justify-center '>
                <div className='bg-white w-80 m-12 p-8 space-y-4 rounded-md'>
                    <p className='capitalize text-center text-2xl'>
                        Enter data
                    </p>
                    <Input
                        id='description'
                        data={description}
                        setData={setDescription}
                        placeholder='Description'
                        label='Description'
                        type='text'
                        error={descriptionError}
                        required={true}
                    />

                    <Input
                        id='amount'
                        data={amount}
                        setData={setAmount}
                        placeholder='Amount'
                        label='Amount'
                        type='number'
                        error={amountError}
                        required={true}
                    />
                    <input
                        type='submit'
                        value='Continue'
                        className='mt-20 px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-600 focus:ring-opacity-80 cursor-pointer'
                        onClick={handleButtonClick}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
