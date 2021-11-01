import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './ImageUpload.css';
import imageCompression from 'browser-image-compression';

const ImageUpload = props =>{
    const [file,setFile]=useState(null);
    const [isValid,setIsValid]=useState(true);
    const [previewUrl,setPreviewUrl]=useState(null);
    const filePickerRef=useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        console.log('recieved file',file, file.size)
        const fileReader = new FileReader();
        fileReader.onload =()=>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    },[file])

    const pickedHandler = async event =>{

        let pickedFile;
        let compressedFile
        let fileIsValid = isValid;

        
        if(event.target.files && event.target.files.length ===1){
            pickedFile =event.target.files[0]

            console.log('originalFile instanceof Blob', pickedFile instanceof Blob); // true
            console.log(`originalFile size ${pickedFile.size / 1024 / 1024} MB`);
            try{
                compressedFile= await imageCompression(pickedFile, props.options)
                console.log('compressedFile instanceof Blob', compressedFile); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                setFile(compressedFile)
                setIsValid(true);
                fileIsValid=true;
            }catch(err){
                console.log(err)
            }
            
        }
        else{
            setIsValid(false)
            fileIsValid=false;
        }
        props.onInput(props.id, compressedFile ,fileIsValid)
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