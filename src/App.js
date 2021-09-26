import './App.scss';
import { useEffect, useState } from 'react';
import Header from './Header/Header';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import PostCreate from './PostCreate/PostCreate';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Login from './Login/Login';
import Feed from './Feed/Feed';
import PostPage from './PostPage/PostPage';
import EditProfile from './EditProfile/EditProfile'; 
import { UserService } from './services/user.service';
import { UserContext } from './user-context';
 


function App() {

  const history = useHistory();
  const [user,setUser] = useState({});

  useEffect(()=> {
    async function getMe() {
      try{  
            const user = await UserService.me();
            if(!user){
              history.push('/login');
              return;
            }
            setUser(user);
          } catch(err) {
            console.log(err);
          }
      }
      getMe();
    }, [history]);

   function isLoggedIn() {
     return !!Object.keys(user).length;
   } 
    
  return (
    <UserContext.Provider value={{user, setUser}}>
        <div className="App">
          { isLoggedIn() && <Header /> }
          <div className="container App-container">
           <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/user/edit">
                <EditProfile />
              </Route>
              <Route path="/post/create">
                <PostCreate/>
              </Route>
              <Route path="/post/:id">
                <PostPage />
              </Route>
              <Route path="/profile/:username">
                <Profile />
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
    </UserContext.Provider>
  );
}


export default App;
