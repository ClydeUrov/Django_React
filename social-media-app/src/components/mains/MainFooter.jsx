import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function MainFooter() {
    return (
        <MDBFooter className='bg-dark text-center text-white pt-1'>
            <div className='main-footer'>
                <MDBContainer className='text-center text-md-start'>
                <MDBRow className='mt-3'>
                    <MDBCol md='3' lg='4' xl='3' className='mx-auto'>
                    <h6 className='text-uppercase fw-bold mb-4'>
                        <MDBIcon color='secondary' icon='gem' className='me-3' />
                        Travel Social Network
                    </h6>
                    <p>
                        Here you can find activity to your liking, like-minded people and offer your event, exhibition or even a party.
                    </p>
                    </MDBCol>

                    <MDBCol md='2' lg='2' xl='2' className='mx-auto'>
                    <h6 className='text-uppercase fw-bold mb-4'>Community</h6>
                    <p>
                        <a href='#!' className='text-reset'>
                            Search
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                            Events
                        </a>
                    </p>
                    <p>
                        <a href='#!' className='text-reset'>
                            Places
                        </a>
                    </p>
                    </MDBCol>

                    <MDBCol md='3' lg='2' xl='2' className='mx-auto'>
                        <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                        <p>
                            <a href='#!' className='text-reset'>
                                Home
                            </a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>
                                About us
                            </a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>
                                Help
                            </a>
                        </p>
                    </MDBCol>

                    <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0'>
                        <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                        <p>
                            New York, NY 10012, US
                        </p>
                        <p>
                            info@example.com
                        </p>
                        <p>
                            + 01 234 567 88
                        </p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            

                <MDBContainer className='p-1 pb-0'>
                    <div className='mb-1'>
                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaFacebook />
                        </a>

                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaTwitter />
                        </a>

                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaGoogle />
                        </a>
                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaInstagram />
                        </a>

                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaLinkedin />
                        </a>

                        <a style={{ fontSize: 'xx-large' }} color="light" className='m-4' href='#!' role='button'>
                            <FaGithub />
                        </a>
                    </div>
                </MDBContainer>

                <div className='text-center p-2'>
                    Made in Ukraine © 2022-2023
                </div>
            </div>
        </MDBFooter>
    );
}

export default MainFooter;