import { NavLink } from "react-router-dom"

const Header = () => {

    return (

        <>
        <header className='header'>
            <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297__340.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
            <nav>
                <ul className='nav-links'>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/register'>Registration</NavLink></li>
                </ul>
            </nav>
        </header>

        </>
    )
}

export default Header