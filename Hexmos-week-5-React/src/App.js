// import logo from './logo.svg';
import React from 'react';
import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import PollDetail from "./PollDetail";
import Vote from './Vote';
import Createpoll from './CreatePoll';
import Sidebar from './Sidebar';


function App() {
  return (
   <div>
  
   <BrowserRouter>
    <Routes>
   
      <Route exact path="/" element={<Home />}/>
      <Route path='/PollDetail' element={<PollDetail />}/>
      <Route path='/Vote' element={<Vote />}/>
      <Route path='/Creatpoll' element={<Createpoll />} />

      <Route path='/Sidebar' element={<Sidebar />} />
      
    </Routes>
   </BrowserRouter>
   </div>
   
  );
}

export default App;
