import React from 'react';
import { Link } from "react-router-dom";

export default function App() {

    return (
        <header>
            <div className='text-header bg-image m-auto'>
                <div className='mask p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3'>Weekend World</h1>
                        <h4 className='mb-3 fst-italic fw-lighter'>Join us & WEekend every day!</h4>
                        <button className="glow-on-hover" to="/login/">Join Us</button>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}