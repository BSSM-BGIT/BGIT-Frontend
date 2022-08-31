import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home';
import Bojrank from './components/Bojrank';
import Share from './components/Share';
import Notfound from './components/Notfound';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={Error}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/bojrank' element={<Bojrank />}></Route>
            <Route path='/share' element={<Share />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<Notfound />}></Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
