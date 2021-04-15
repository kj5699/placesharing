import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UserList from '../components/userlist/userlist';
import './users.css'

const Users = props =>{
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const [loadedUsers, setLoadedUsers] = useState([])
    
    useEffect(()=>{
        const fetchUsers =async ()=>{
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/');
                setLoadedUsers(responseData.user)

            }catch(err){}
        }
        fetchUsers()
        
    },[sendRequest])


    
    return( 
        <React.Fragment>
            {!isLoading && !loadedUsers && <ErrorModal error={error} onClear={clearError}></ErrorModal>}
            {isLoading && <div className ='center'>
                <LoadingSpinner ></LoadingSpinner>
                
            </div>}
            {!isLoading && <UserList items={loadedUsers} />}

        </React.Fragment>
    )
}
export default Users;
