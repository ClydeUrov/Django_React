import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function App() {
    return (
        <MDBFooter className='bg-dark text-center text-white pt-1'>
            <div className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                <MDBRow className='mt-3'>
                    <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>
                        <MDBIcon color='secondary' icon='gem' className='me-3' />
                        Travel Social Network
                    </h6>
                    <p>
                        Here you can find activity to your liking, like-minded people and offer your event, exhibition or even a party.
                    </p>
                    </MDBCol>

                    <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                    <p>
                        <a href='#!' className='text-reset'>
                        Angular
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        React
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        Vue
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        Laravel
                        </a>
                    </p>
                    </MDBCol>

                    <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                    <p>
                        <a href='#!' className='text-reset'>
                        Pricing
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        Settings
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        Orders
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                        Help
                        </a>
                    </p>
                    </MDBCol>

                    <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                    <p>
                        <MDBIcon color='secondary' icon='home' className='me-2' />
                        New York, NY 10012, US
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='envelope' className='me-3' />
                        info@example.com
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                    </p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </div>

            <div className='d-none d-lg-block'>
                <span>Get connected with us on social networks:</span>
            </div>

            <MDBContainer className='p-1 pb-0'>
                <div className='mb-1'>
                    <a style={{ fontSize: 'xx-large' }} color="light" floating className='m-4' href='#!' role='button'>
                        <FaFacebook />
                    </a>

                    <a style={{ fontSize: 'xx-large' }} outline color="light" className='m-4' href='#!' role='button'>
                        <FaTwitter />
                    </a>

                    <a style={{ fontSize: 'xx-large' }} outline color="light" floating className='m-4' href='#!' role='button'>
                        <FaGoogle />
                    </a>
                    <a style={{ fontSize: 'xx-large' }} outline color="light" floating className='m-4' href='#!' role='button'>
                        <FaInstagram />
                    </a>

                    <a style={{ fontSize: 'xx-large' }} outline color="light" floating className='m-4' href='#!' role='button'>
                        <FaLinkedin />
                    </a>

                    <a style={{ fontSize: 'xx-large' }} outline color="light" floating className='m-4' href='#!' role='button'>
                        <FaGithub />
                    </a>
                </div>
            </MDBContainer>

            <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:  
                <a className='text-white' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}