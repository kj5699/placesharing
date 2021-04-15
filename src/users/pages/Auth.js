import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import './Auth.css'
import useForm from '../../shared/hooks/form-hooks';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const AuthForm = props =>{

    const auth= useContext(AuthContext)
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler,setFormData] =useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }

    },false)


    const authSubmitHandler= async event =>{
    
        event.preventDefault()
        if (isLoginMode){
            try{
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/users/login',
                    'POST',
                    JSON.stringify({
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value
                    }),
                    {
                        'Content-Type':'application/json'
                    })  
            auth.login(responseData.userId,responseData.token)
            }catch(err){
            }
        }
        else{

            const formData= new FormData()
            formData.append('email', formState.inputs.email.value)
            formData.append('name', formState.inputs.name.value)
            formData.append('password', formState.inputs.password.value)
            formData.append('image', formState.inputs.image.value)
            try{
                const responseData=await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/signup',
                    'POST',
                    formData
                )
                auth.login(responseData.userId ,responseData.token)
            }catch(err){
                console.log(err)
            }
            
        }
    }
    
    
    const switchAuthHandler =(event)=>{
       
        if (!isLoginMode){
            setFormData({...formState.inputs, name:undefined, image:undefined},formState.inputs.email.isValid && formState.inputs.password.isValid)

        }else{
            setFormData({...formState.inputs,
                        name: {value:'',isValid: false}, 
                        image:{value:null, isValid:false}},
                        false)

        }
        setIsLoginMode(prevState => !prevState)
    }
    
    return (
        <React.Fragment>

        <ErrorModal error={error} onClear={clearError}></ErrorModal>
            <Card className='authentication'>
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Login Required</h2>
            <form onSubmit={authSubmitHandler}>
            {!isLoginMode ?
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a Name"
                    onInput={inputHandler}
                />
                :null
            }
            {! isLoginMode ? 
            <ImageUpload center id="image" onInput={inputHandler} options={{
                maxSizeMB :0.05,
                maxWidthOrHeight :100,
                useWebWorker:true
            }}/>
            :null}

        <Input
            id="email"
            element="input"
            type="email"
            label="Email Id"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
        />
        <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password. Password shoul be at least 6 characters long."
            onInput={inputHandler}
            />
        <Button type="submit" disabled={!formState.isValid} className='centered'>
                {isLoginMode? 'LOGIN' : 'SIGNUP'}
        </Button>
            </form>

            <Button inverse onClick={switchAuthHandler}  className='centered'>
                {isLoginMode? 'SWITCH TO SIGNUP' : 'SWITCH TO LOGIN'}
            </Button>
            
        </Card>
        </React.Fragment>
        
        
    )

}

export default AuthForm;