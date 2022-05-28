import React from 'react';
import ContentAndFooter from './components/ContentAndFooter.js';
import Header from './components/Header.js';
import Logo from './components/Logo';
import "./index.css"

function App() {
    return (
        <div className="app">
            <Logo />
            <Header />
            <ContentAndFooter />
        </div>
    );
}

export default App;