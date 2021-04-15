import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../UIElements/Backdrop';
import MainHeader from './MainHeader';
import './MainNavigation.css'
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = props =>{
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const openDrawer=() =>{
        setDrawerIsOpen(true)

    }
    const closeDrawer=() =>{
        setDrawerIsOpen(false)
    }
    return(
        <React.Fragment>
        {drawerIsOpen&& <Backdrop onClick={closeDrawer}></Backdrop>}   
        <SideDrawer show={drawerIsOpen} onClick={closeDrawer} >
            <nav className='main-navigation__drawer-nav'>
            <NavLinks logoutHandler={props.logoutHandler}></NavLinks>
            </nav>
            
        </SideDrawer>    
        
        <MainHeader>
            <button className='main-navigation__menu-btn' onClick={openDrawer}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1 className='main-navigation__title'>
                <Link to='/'>PlaceShare</Link>
            </h1>

            <nav className='main-navigation__header-nav'>
                <NavLinks logoutHandler={props.logoutHandler}></NavLinks>
            </nav>



        </MainHeader>
        </React.Fragment>
    )
}
export default MainNavigation;