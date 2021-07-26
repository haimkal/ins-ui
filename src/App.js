import './App.scss';
import { useEffect } from 'react';
import Header from './Header/Header';
import Register from './Register/Register';
import PostCreate from './PostCreate/PostCreate';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Login from './Login/Login';
import Feed from './Feed/Feed';
import { UserService } from './services/user.service';
 


function App() {

  const history = useHistory();

  useEffect(()=> {
    async function getMe() {
      try{  
            const user = await UserService.me()
            if(!user){
              history.push('login');
            }
          } catch(err) {
            console.log(err);
          }
      }
      getMe();
    }, []);

    
    
  return (
        <div className="App">
          <Header />
          <div className="container">
           <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/post/create">
                <PostCreate/>
              </Route>
              <Route path="/Register">
                <Register/>
              </Route>
              <Route path="/" exact>
                <Feed />
              </Route>
            </Switch> 
          </div>
        </div>
  );
}


export default App;
