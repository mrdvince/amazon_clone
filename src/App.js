import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51HSiAdDjXQGBrYZITEmlOrmOrutNvnxC2f5oyr51lKW8fczrepaU3zVVJY9ndturoSagqSc7eahtJJvDWYC4Z9kg00IfojvxAC')

function App() {

  const [{ }, dispatch] = useStateValue()

  useEffect(() => {
    //runs only once, when the app component loads

    auth.onAuthStateChanged(authUser => {
      //console.log('user is: ', authUser)

      if (authUser) {
        // loged in user

        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // user is logged out

        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])


  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/checkout'>
            {/* header*/}
            <Header />
            <Checkout />
          </Route>

          <Route path='/payment'>
            {/* header*/}
            <Header />

            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/'>
            {/* header*/}
            <Header />
            {/* home*/}
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
