import React from 'react';

import Image from 'next/image';

export default function CopyableText({ text }) {
    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    return (
        <div
            className='flex flex-row flex-wrap cursor-pointer'
            onClick={copyToClipboard}
        >
            <p className='pb-4 pr-2'>{text}</p>
            <div className='mt-1'>
                <Image src={`/images/copy-icon.svg`} width={16} height={16} />
            </div>
        </div>
    );
}
