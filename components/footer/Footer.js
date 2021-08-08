import React from 'react';

export default function Footer() {
    return (
        <footer className='flex items-center justify-center w-full h-auto'>
            <p className='text-md text-center text-gray-500'>
                Copyright ©{' '}
                <a
                    className='text-md text-gray-900'
                    href={`${process.env.NEXT_PUBLIC_COPYRIGHT_URL}`}
                >
                    {process.env.NEXT_PUBLIC_NAME}
                </a>
                <br />
                2021
            </p>
        </footer>
    );
}
