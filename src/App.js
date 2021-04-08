import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
function App() {
  const [{ user }, dispatch] = useStateValue();

  //* useEffect Hook  <<<<< Very Powerful (your bestf)
  //* Piece of code which runs based on a given condition

  useEffect(() => {
    //* STEP 2 : Add listener after redirecting after login or logout
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Login --> Push the user into the data layer
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        //Logout  --> Set the user to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
    return () => {
      //Any cleanup operations go in here...
      unsubscribe();
    };
  }, []);
  console.log('USER IS >>>>', user); //* Check for the user debugging technique
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/*BOTTOM ONE IS THE DEFAULT ONE*/}
          {/*amazon.com/blabla --> anything other than route 
          by default will go to home page*/}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
