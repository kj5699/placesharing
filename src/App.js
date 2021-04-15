import React, { Suspense, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Places from './places/pages/Places';
import Button from './shared/components/FormElements/Button';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import Modal from './shared/components/UIElements/Modal';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MainPage from './shared/pages/main';
// import AuthForm from './users/pages/Auth';
// import Users from './users/pages/users';

const Users = React.lazy(()=>import('./users/pages/users'))
const AuthForm = React.lazy(()=>import('./users/pages/Auth'))
const NewPlace = React.lazy(()=>import('./places/pages/NewPlace'))
const UpdatePlace = React.lazy(()=>import('./places/pages/UpdatePlace'))
const UserPlaces = React.lazy(()=>import('./places/pages/UserPlaces'))

const App =(props)=> {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {token ,login, logout, userId} =useAuth();

  const showLogoutWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelLogoutHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmLogoutHandler = async () => {
    setShowConfirmModal(false);
    logout()
    
  };

  const routes= !!token ? (
    <Switch>
        <Route path ='/' exact component={MainPage}></Route>
        <Route path ='/users' exact component={Users}></Route>
        <Route path ='/places' exact component={Places}></Route>
        <Route path='/:userId/places' exact component={UserPlaces}></Route>
        <Route path ='/places/new' exact component={NewPlace}></Route>
        <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
        <Redirect to='/'></Redirect>
      </Switch>

  ):(
    <Switch>
        <Route path ='/' exact component={MainPage}></Route>
        <Route path ='/users' exact component={Users}></Route>
        <Route path ='/auth' exact component={AuthForm}></Route>
        <Route path ='/places' exact component={Places}></Route>
        <Route path='/:userId/places' exact component={UserPlaces}></Route>
        <Redirect to='/auth'></Redirect>
      </Switch>

  )

  return (
    
    <AuthContext.Provider value={ 
      {isLoggedIn:!!token,
      token: token,
      userId:userId, 
      login:login, 
      logout:logout}}>
    <BrowserRouter>
    <Modal
        show={showConfirmModal}
        onCancel={cancelLogoutHandler}
        header="Confirm Logout"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelLogoutHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmLogoutHandler}>
              Log Out
            </Button>
          </React.Fragment>
        }
      >
        <h3>Do you want to Logout?</h3>
      </Modal>

      <MainNavigation logoutHandler={showLogoutWarningHandler}></MainNavigation>
      <main >

        <Suspense fallback={<div className='center'><LoadingSpinner /> </div>}>
        {routes}
        </Suspense>
        
      </main>
      
    </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export default App;
