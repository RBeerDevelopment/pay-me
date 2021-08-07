import React from 'react';

export default function DetailsCard({ amount, description }) {
    return (
        <div className='bg-white w-80 m-12 p-8 space-y-4 rounded-md'>
            <p className='capitalize text-center text-xl'>You will pay</p>
            <p className='capitalize text-center text-4xl font-bold'>
                {parseFloat(amount).toFixed(2)}€
            </p>
            <p className=' text-center text-xl'>for</p>
            <p className='capitalize text-center text-4xl font-bold'>
                {description}
            </p>
        </div>
    );
}
