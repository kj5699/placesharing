import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Avatar from '../../shared/components/UIElements/Avatar';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import './UserPlace.css'


const UserPlaces = props =>{
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [activeUser,setActiveUser]= useState(null)
    const userId = useParams().userId;
    const auth = useContext(AuthContext)
    
    useEffect(()=>{
        const fetchPlaces =async ()=>{
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(responseData.places)
                setActiveUser(responseData.userDetail)

            }catch(err){}
        }
        fetchPlaces()
        setIsCurrentUser(auth.userId===userId)
        
    },[sendRequest,userId])

    console.log(loadedPlaces)
    console.log(activeUser)

    const deletePlaceHandler =(deletedPlaceId)=>{
        setLoadedPlaces(prevState=> prevState.filter(place=> place.id!==deletedPlaceId))
    }


    
    return (
        <div className='profile'>
            {!isLoading && !loadedPlaces &&<ErrorModal error={error} onClear={clearError}></ErrorModal> }
            {isLoading && <div className ='center'>
                <LoadingSpinner ></LoadingSpinner>
                
            </div>}
            {activeUser&&
            <div className="profile-header">
                    <div className='profile-header__image'>
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${activeUser.image}`} alt={props.name} />
                    </div>
                    <div className="profile-header__info">
                        <h3>{activeUser.name}</h3>
                        <p><strong>{activeUser.n_places} </strong> {activeUser.n_places=== 1? 'Place' :'Places'}  </p>
                    </div>
            </div>
            }
            <div>
            {!isLoading && loadedPlaces && <PlaceList isCurrentUser={isCurrentUser} items={loadedPlaces} onDeletePlace={deletePlaceHandler} />}
            </div>
            

    </div>
    )

    
}
export default UserPlaces;