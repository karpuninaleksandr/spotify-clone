import { useState, useEffect } from 'react'
import React from 'react'
import Content from './components/Content.js'
import Footer from './components/Footer'
import Header from './components/Header.js'
import Logo from './components/Logo'
import './index.css'

function App() {
    const[currentTrack, setCurrentTrack] = useState()
    
    return (
        <div className='app'>
            <Logo />
            <Header />
            <Content currentTrack = {currentTrack} updateCurrentTrack = {setCurrentTrack}/>
            <Footer currentTrack = {currentTrack}/>
        </div>
    );
}

export default App;