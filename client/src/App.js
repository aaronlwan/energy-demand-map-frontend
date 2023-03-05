import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CallToActionWithAnnotation from './components/home-page/Home';
import MapPage from './components/map-page/MapPage';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/home" element={<CallToActionWithAnnotation/>}/>
            <Route exact path="/site-sourcing-map/:lat/:lon/:rad" element={<MapPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>

  )
}

export default App;
