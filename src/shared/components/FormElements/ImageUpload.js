import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './ImageUpload.css'

const ImageUpload = props =>{
    const [file,setFile]=useState(null);
    const [isValid,setIsValid]=useState(true);
    const [previewUrl,setPreviewUrl]=useState(null);
    const filePickerRef=useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        console.log(file)
        const fileReader = new FileReader();
        fileReader.onload =()=>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    },[file])

    const pickedHandler = event =>{

        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length ===1){
            pickedFile =event.target.files[0]
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid=true;
        }
        else{
            console.log('no files Found')
            setIsValid(false)
            fileIsValid=false;
        }
        console.log(props.id, pickedFile ,fileIsValid)
        props.onInput(props.id, pickedFile ,fileIsValid)
    }

    const pickImageHandler =enent =>{
        
        filePickerRef.current.click()
    }
    return(
        <div className='form-control'>
            <input id={props.id}
            ref={filePickerRef} 
            style={{display :'none'}} 
            type="file" accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}

            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl&&<img src={previewUrl} alt='Preview'></img>}
                    {!previewUrl&&<p>Please pick a image</p>}
                </div>
                <Button onClick={pickImageHandler} type="button">Upload</Button>
            </div>
            {!isValid && <p>props.errorText</p>}
            
        </div>
    )
}
export default ImageUpload;