import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';


const Places = props =>{
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const userId = useParams().userId;
    
    useEffect(()=>{
        const fetchPlaces =async ()=>{
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`);
                setLoadedPlaces(responseData.places)

            }catch(err){}
        }
        fetchPlaces()
        
    },[sendRequest])



    console.log(loadedPlaces)
    return (
        <React.Fragment>
            {!isLoading && <ErrorModal error={error} onClear={clearError}></ErrorModal> }
            {isLoading && <div className ='center'>
                <LoadingSpinner ></LoadingSpinner>
                
            </div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}></PlaceList>}

    </React.Fragment>
    )

    
}
export default Places;