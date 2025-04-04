import React from 'react'
import "./App.css";
import Crossword from './components/chess/Crosswords';
import { Routes, Route } from "react-router-dom";
import ListContainer from './components/lists/ListContainer';
import Board from './components/todo/Board';
import BoardExample from './components/peoples/Example';

const App = () => {

  return (
    // <div className='home'>
    <Routes>
      <Route path='/todo' element={<Board />} />
      <Route path='/' element={<BoardExample />} />
      <Route path='/list' element={<ListContainer />} />
      <Route path='/chess' element={<Crossword />} />
    </Routes>
    // </div>
  )
}

export default App