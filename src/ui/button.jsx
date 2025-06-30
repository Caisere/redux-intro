import React from 'react'

const Button = ({children, onClick, disabled}) => {
    return (
        <button disabled={disabled} className="mt-4 bg-indigo-500 text-stone-50 w-[50%] mx-auto p-2 pointer-cursor rounded-xl md:bg-indigo-300 md:hover:bg-indigo-500 transition-colors duration-300" onClick={onClick}>{children}</button>
    )
}

export default Button