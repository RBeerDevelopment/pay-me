import React from 'react';

export default function Footer() {
    return (
        <footer className='flex items-center justify-center w-full h-auto'>
            <p className='text-md text-center text-gray-500'>
                Copyright ©{' '}
                <a className='text-md text-gray-900' href='https://robin.beer/'>
                    Robin Beer
                </a>
                <br />
                2021
            </p>
        </footer>
    );
}
