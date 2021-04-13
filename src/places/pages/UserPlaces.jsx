import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UserList from '../../users/components/userlist/userlist';
import PlaceList from '../components/PlaceList';


const UserPlaces = props =>{
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const userId = useParams().userId;
    
    useEffect(()=>{
        const fetchPlaces =async ()=>{
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(responseData.places)

            }catch(err){}
        }
        fetchPlaces()
        
    },[sendRequest])

    const deletePlaceHandler =(deletedPlaceId)=>{
        setLoadedPlaces(prevState=> prevState.filter(place=> place.id!==deletedPlaceId))
    }


    
    return (
        <React.Fragment>
            {!isLoading && <ErrorModal error={error} onClear={clearError}></ErrorModal> }
            {isLoading && <div className ='center'>
                <LoadingSpinner ></LoadingSpinner>
                
            </div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={deletePlaceHandler} />}

    </React.Fragment>
    )

    
}
export default UserPlaces;