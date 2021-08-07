import React, { useRef } from 'react';

const Input = ({
    id,
    data,
    setData,
    placeholder = '',
    label = '',
    type = 'text',
    wrapperClassName = '',
    error = 'a',
    required = false,
    ...rest
}) => {
    const inputRef = useRef();
    return (
        <div className={wrapperClassName}>
            <div
                className={`transition duration-150 ease-in-out`}
                onClick={() => inputRef.current.focus()}
            >
                <label
                    htmlFor={id}
                    className={`text-xs text-primary font-light placeholder-gray-400 px-2 pt-1.5 `}
                >
                    {label}
                    {required && <span className='text-red'>*</span>}
                </label>
                <input
                    ref={inputRef}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onChange={(event) => setData(event.target.value)}
                    value={data}
                    className={`w-full px-2 pb-1.5 text-primary outline-none text-base font-light focus:ring-green-700 rounded-md ${
                        error
                            ? 'focus-within:border-red-600 border-red-400 border-2'
                            : 'focus-within:border-primary border-gray-400'
                    } `}
                    {...rest}
                />
            </div>
            {error && <p className='text-xs pl-2 text-red-600 mb-4'>{error}</p>}
        </div>
    );
};

export default Input;
