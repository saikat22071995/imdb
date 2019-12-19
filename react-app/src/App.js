import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './components/user/userLogin';
import UserRegister from './components/user/userRegister'
import Home from './components/common/home'
import ProducerList from './components/producer/producerList'
import ProducerAdd from './components/producer/producerAdd'
import ProducerEdit from './components/producer/producerEdit'
import MovieList from './components/movie/movieList'
import ActorList from './components/actor/actorList'
import ActorAdd from './components/actor/actorAdd'
import ActorEdit from './components/actor/actorEdit'
import MovieAdd from './components/movie/movieAdd'
import MovieEdit from './components/movie/movieEdit'

function App() {
  return (
    <BrowserRouter>
   
      
      <nav className="navbar navbar-dark bg-dark">
      {
      localStorage.getItem('authToken')?
      (<div>
        <Link to="/" className="navbar-brand">Home  </Link>
        <Link to="/movies" className="navbar-brand"> Movies  </Link>
        <Link to="/actors" className="navbar-brand"> Actors  </Link>
        <Link to="/producers" className="navbar-brand"> Producers  </Link>
        <Link to="/logout" className="navbar-brand"> Logout</Link>
      </div>):
      (<div>
      <Link to="/" className="navbar-brand">Home  </Link>
      <Link to="/users/login" className="navbar-brand"> Login  </Link>
      <Link to="/users/register" className="navbar-brand"> Register</Link>
      </div>)
    }
      </nav>
    
   
   <Switch>
     <Route path="/" component={Home} exact={true}></Route>
     <Route path="/users/login" component={UserLogin} ></Route>
     <Route path="/users/register" component={UserRegister} ></Route>
     <Route path="/producers" component={ProducerList} exact={true}></Route>
     <Route path="/producers/new" component={ProducerAdd} ></Route>
     <Route path="/producers/edit/:id" component={ProducerEdit} ></Route>
     <Route path="/actors" component={ActorList} exact={true}></Route>
     <Route path="/actors/new" component={ActorAdd} ></Route>
     <Route path="/actors/edit/:id" component={ActorEdit} ></Route>
     <Route path="/movies" component={MovieList} exact={true}></Route>
     <Route path="/movies/new" component={MovieAdd}></Route>
     <Route path="/movies/edit/:id" component={MovieEdit}></Route>
     <Route path="/logout" component={logout} exact={true}></Route>
   </Switch>
 
  </BrowserRouter>
  );
}

function logout(){
  localStorage.clear()
  {window.location.assign('/users/login')}
}

export default App;
