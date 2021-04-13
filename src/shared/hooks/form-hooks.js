
import React, { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        
        let formIsValid = true;
        
        for (const inputId in state.inputs) {
            if(!state.inputs[inputId]){
                continue;
            }
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      case 'SET_DATA':
          return{
              inputs:action.inputs,
              isValid:action.isValid
          }
      default:
        return state;
    }
  };

const useForm =( initialInputs, inititalFormValidity)=>{

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: inititalFormValidity
      });
      
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id
        });
      }, []);

    const setFormData = useCallback((inputsData, formValidity)=>{
        dispatch({
            type: 'SET_DATA',
            inputs:inputsData,
            isValid:formValidity
        })
    },[])

    return [formState, inputHandler, setFormData]
}
export default useForm;