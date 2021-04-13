import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './PlaceForm.css';
import useForm from '../../shared/hooks/form-hooks';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';



const UpdatePlace = () => {
  const {isLoading ,error, sendRequest, clearError}= useHttpClient()
  const [identifiedPlace, setIdentifiedPlace]=useState(null)
  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData]=useForm (  {
    title: {
      value:'' ,
      isValid: true
    },
    description: {
      value:'',
      isValid: true
    },

  },false)

  const placeId = useParams().placeId;
  useEffect(()=>{

    const fetchPlace =async ()=>{
      
      try{
          const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
        
          setIdentifiedPlace(responseData.place)
          setFormData({
            title: {
              value: responseData.place.title ,
              isValid: true
            },
            description: {
              value:responseData.place.description,
              isValid: true
            },
        
          },true)


      }catch(err){}
    }
    fetchPlace();
    },[setFormData,placeId,sendRequest])
  
  const history=useHistory()
  const placeUpdateSubmitHandler= async event =>{
    event.preventDefault();
    try{
      await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
          'PATCH',
          JSON.stringify({
              title:formState.inputs.title.value,
              description:formState.inputs.description.value,
          }),
          {
            'Content-Type':'application/json',
            Authorization: 'BEARER ' + auth.token
          
          }) 
      history.push('/')
  
  }catch(err){
  }
 }
 if (isLoading) {
  return (
    <div className="center">
        
      <h2>Loading...</h2>
    </div>
  );
}
  if (!identifiedPlace && !isLoading) {
    return (
      <div className="center">
          <Card>
          <h2>Could not find place!</h2>
          </Card>
        
      </div>
    );
  }

  return (
    <Fragment>
    <ErrorModal error={error} onClear={clearError}></ErrorModal>
    {!isLoading && identifiedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>}
    </Fragment>
  );
};

export default UpdatePlace;
