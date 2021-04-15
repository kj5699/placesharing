import React ,{ useContext}from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css'

const NavLinks = props =>{
    const auth= useContext(AuthContext)
    return(
        <ul className='nav-links'>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/users" exact>People</NavLink>
            </li>

            {   auth.isLoggedIn?         
                <li>
                    <NavLink to={`/${auth.userId}/places`} exact>Profile</NavLink>
                </li>:null
            }
            {   auth.isLoggedIn? 
            <li>
                <NavLink to="/places/new">Share</NavLink>
            </li> :null}
            {! auth.isLoggedIn?
            <li>
                <NavLink to="/auth">Log In</NavLink>
            </li>:
            <li>
                <button onClick={props.logoutHandler}>Log Out</button>
            </li>
            }

        </ul>
    )
}
export default NavLinks;