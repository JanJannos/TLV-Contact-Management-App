import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <h3 className='m-3 d-flex justify-content-center'>
         TLV Contact Management Portal
        </h3>
        <h5 className='m-3 d-flex justify-content-center'>          
          WEB API Meets React JS
        </h5>
        <Navigation />
        <Switch>
          <Route path='/' component={Home} exact />
        
          <Route path='/contact' component={Contact} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
