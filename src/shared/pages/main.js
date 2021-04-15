import React from 'react'
import Places from '../../places/pages/Places'
import Users from '../../users/pages/users';
import './main.css'

const MainPage= props=>{
    return(
        <div className='mainpage'>
            <div className='mainpage__places'>
                <Places></Places>
            </div>
            <div className='mainpage__users'>
                <h3> Users</h3>
                <Users></Users>
            </div>
            
            
        </div>
    )

}
export default MainPage;
