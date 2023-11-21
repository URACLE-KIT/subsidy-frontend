import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

window.addEventListener('load', () => {
    const onBackEvent = new Event('onBack')
    M.onBack(() => {
        window.dispatchEvent(onBackEvent)
    })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);