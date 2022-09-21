import React from 'react';
import './style.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import Bojrank from './pages/Bojrank';
import Share from './pages/Share';
import Notfound from './pages/Notfound';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './pages/Error';
import Login from './pages/Login';
import BsmOAuth from './pages/oauth/Bsm';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <ErrorBoundary FallbackComponent={Error}>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/bojrank' element={<Bojrank />}></Route>
                <Route path='/share' element={<Share />}></Route>
                <Route path='/oauth/bsm' element={<BsmOAuth />}></Route>
                <Route element={<Notfound />}></Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </RecoilRoot>
    </div>
  );
}

export default App;
