import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from './components/map-page/MapPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/site-sourcing-map" element={<MapPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
