import React from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BoardExample from './components/peoples/Example';

const App = () => {

  return (
    // <div className='home'>
    <Routes>
      <Route path='/' element={<BoardExample />} />
    </Routes>
    // </div>
  )
}

export default App