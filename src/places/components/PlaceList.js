import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css'

const PlaceList = props =>{
    if (props.items.length===0){
        return <div className='place-list center'>
            <Card>

                <h1>No Places Found</h1>
                {props.isCurrentUser && <Button to={'/places/new'}>Share Places</Button>}
                
            </Card>
            
        </div>
    }else{
        return(
        <ul className='place-list'>

            {props.items.map(place=>
                <PlaceItem key={place.id}
                            id={place.id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creator.id ? place.creator.id : place.creator}
                            userName={place.creator.name}
                            userImage={place.creator.image}

                            coordinates={place.location}
                            onDelete={props.onDeletePlace}></PlaceItem>

            )}
            

        </ul>
    )
    }
}
export default PlaceList;