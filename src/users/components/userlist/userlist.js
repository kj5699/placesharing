import React from 'react';
import Useritem from '../useritem/useritem';
import './userlist.css'

const UserList = props =>{
    if (props.items.length===0){
        return <div className='center'>
            <h1>User not Found</h1>
        </div>
    }else{
        return ( 
        <ul className= 'users-list'>
            {props.items.map(user=>{
                return <Useritem
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            image={user.image}
                            places={user.places.length}
                        />
            })}

        </ul>
        )
    }
}
export default UserList;