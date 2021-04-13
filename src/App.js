import React, { Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
// import AuthForm from './users/pages/Auth';
// import Users from './users/pages/users';

const Users = React.lazy(()=>import('./users/pages/users'))
const AuthForm = React.lazy(()=>import('./users/pages/Auth'))
const NewPlace = React.lazy(()=>import('./places/pages/NewPlace'))
const UpdatePlace = React.lazy(()=>import('./places/pages/UpdatePlace'))
const UserPlaces = React.lazy(()=>import('./places/pages/UserPlaces'))

const App =(props)=> {

  const {token ,login, logout, userId} =useAuth();

  const routes= !!token ? (
    <Switch>
        <Route path ='/' exact component={Users}></Route>
        <Route path='/:userId/places' exact component={UserPlaces}></Route>
        <Route path ='/places/new' exact component={NewPlace}></Route>
        <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
        <Redirect to='/'></Redirect>
      </Switch>

  ):(
    <Switch>
        <Route path ='/' exact component={Users}></Route>
        <Route path ='/auth' exact component={AuthForm}></Route>
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

      <MainNavigation></MainNavigation>
      <main>
        <Suspense fallback={<div className='center'><LoadingSpinner /> </div>}>
        {routes}
        </Suspense>
        
      </main>
      
    </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export default App;
