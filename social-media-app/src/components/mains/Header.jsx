import React from 'react';

export default function App() {

    return (
        <header>
            <div
                className='p-5 text-center bg-image m-auto'
                style={{ backgroundImage: "url('https://klike.net/uploads/posts/2019-11/1574605256_5.jpg')", height: '100%', width: '100%' }}
            >
                <div className='mask p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3'>Travel Social Network</h1>
                        <h4 className='mb-3'>Join us and we will show you all upcoming events</h4>
                        <button className="btn btn-primary btn-lg" href='http://127.0.0.1:3000/login/'>Join Us</button>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}