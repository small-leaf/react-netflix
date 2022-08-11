import { useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/reducers/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const AppContainer = styled.div`
  background-color: #111;
`

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        )
      } else {
        dispatch(logout())
      }
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return (
    <AppContainer>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        )}
      </Router>
    </AppContainer>
  );
}

export default App;
