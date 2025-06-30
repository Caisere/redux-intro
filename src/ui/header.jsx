import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccountName, logoutUser } from '../features/customers/customerSlice'

const Header = () => {

    const userName = useSelector(getUserAccountName)
    const dispatch = useDispatch()

    function handleLogOut () {
        dispatch(logoutUser())
    }

    return (
        <header className='w-full bg-indigo-400 text-gray-100 flex justify-between items-center p-4 font-semibold text-xl'>
            <h1>🏦 Simple Bank ⚛️</h1>
            {userName &&
                <button onClick={handleLogOut}>Logout</button>}
        </header>
    )
}

export default Header