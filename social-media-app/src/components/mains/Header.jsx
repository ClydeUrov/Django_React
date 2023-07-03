import React from 'react';
import {
    MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {

    return (
        <header className='bg-dark'>
            
            <div
                className='p-5 text-center bg-image m-auto'
                style={{ backgroundImage: "url('https://klike.net/uploads/posts/2019-11/1574605256_5.jpg')", height: '100%', width: '100%' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3'>Travel Social Network</h1>
                        <h4 className='mb-3'>Join us and we will show you all upcoming events</h4>
                        <MDBBtn tag="a" outline size="lg" href='http://127.0.0.1:3000/login/'>
                            Join Us
                        </MDBBtn>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}