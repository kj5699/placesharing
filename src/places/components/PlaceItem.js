import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css'

const PlaceItem = props =>{
    const {isLoading ,error, sendRequest, clearError}= useHttpClient()
    const auth=useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const openModal=() =>{
        setModalIsOpen(true)

    }
    const closeModal=() =>{
        setModalIsOpen(false)
    }
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };
    
      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };
      const history=useHistory()
      const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try{
          await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 
          'DELETE',
          null,
          {
            Authorization: 'BEARER ' + auth.token
          } )
          props.onDelete(props.id)
        }catch(err){

        } 
      history.push(`/${auth.userId}/places`)
        
      };
    return(
        <React.Fragment>
        <Modal show={modalIsOpen}
                header={props.address}
                onCancel={closeModal}
                contentClass='place-item__modal-content'
                footerClass= 'place-item__modal-actions'
                footer ={<Button onClick={closeModal}>CLOSE</Button>}
        >
            <div className='map-container'>  
                <Map center={[props.coordinates.lat,props.coordinates.lng]} zoom={16}/>
            </div>
            
        </Modal>

        <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>

        <li className='place-item'>
            <Card className='place-item__content'>
                <div className='place-item__image'>
                    <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
                </div>
                <div className='place-item__info'>
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className='place-item__actions'>
                    <Button inverse onClick ={openModal}>VIEW ON MAP</Button>

                    {auth.userId=== props.creatorId ? <Button to={`/places/${props.id}`}>EDIT</Button>: null}
                    
                    {auth.userId=== props.creatorId  ?<Button danger onClick={showDeleteWarningHandler}>
                        DELETE</Button> :null}
                </div>
            </Card>

        </li>

        </React.Fragment>
        

    )
}
export default PlaceItem;