

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './PlaceForm.css'
import useForm from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Fragment, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';



const NewPlace = () => {
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const auth = useContext(AuthContext);
    const [formState, inputHandler]=useForm(  {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          },
          address:{
            value: '',
            isValid: false
          },
          image:{
            value:null,
            isValid:false
          }
        },false)

 
  const history =useHistory()
  const placeSubmitHandler= async event =>{
     event.preventDefault();
     
     try{
      const formData= new FormData()
      formData.append('title',formState.inputs.title.value)
      formData.append('description',formState.inputs.description.value)
      formData.append('address',formState.inputs.address.value)
      formData.append('image',formState.inputs.image.value)
      await sendRequest(process.env.REACT_APP_BACKEND_URL+'places/',
          'POST',
          formData,
          {
            Authorization: 'BEARER ' + auth.token
          })

      history.push('/')
  
  }catch(err){
  }}

  return (
    <Fragment>
    <ErrorModal error={error} onClear ={clearError}></ErrorModal>
    <form className="place-form" onSubmit= {placeSubmitHandler}>
      {isLoading && <LoadingSpinner isOverlay></LoadingSpinner>}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />

    <Input
        id="address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter the place address"
        onInput={inputHandler}
      />

      <ImageUpload center id="image" onInput={inputHandler}/>
            
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </Fragment>

  );
};

export default NewPlace;

