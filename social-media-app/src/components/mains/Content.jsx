import React, {useRef, useState} from 'react';
import { motion, useInView } from "framer-motion";
import Slideshow from "../mains/Slideshow"
import LoginForm from '../authentication/LoginForm';
import RegistrationForm from '../authentication/RegistrationForm';

function TextSection({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const textStyle = {
        transform: isInView ? "none" : "translateX(300px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }

    return (
        <div className='col-6 px-4  m-0 d-flex flex-row align-items-start' ref={ref}>
            <div className='w-150' style={textStyle}>
                {children}
            </div>
        </div>
    );
}

function ImageSection({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const imageStyle = {
        transform: isInView ? "none" : "translateY(300px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }

    return (
        <div className='col-6' ref={ref}>
            <div style={imageStyle}>
                {children}
            </div>
        </div>
    );
}

function ItemSection({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const imageStyle = {
        transform: isInView ? "none" : "translate(300px, 300px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }

    return (
        <div ref={ref} className='mt-4 mx-auto'>
            <div style={imageStyle}>
                {children}
            </div>
        </div>
    );
}

const Content = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const showLoginForm = () => {
        setIsLoginFormVisible(true);
    };
    
    const showRegistrationForm = () => {
        setIsLoginFormVisible(false);
    };

    return (
        <div className='text-center text-white body-content'>
            <div className='tourism'>
                <div className='content-text text-center px-4' >
                    <h2 className='animated-text'>Welcome to the Weekend World</h2>
                    <span className='animated-text'>
                    Welcome to our vibrant travel community! 🌍 Connect with fellow adventurers, share your journeys, 
                    and discover new horizons. Whether you're an explorer, a wanderer, or simply looking for travel 
                    inspiration, you've found the perfect place to embark on your next adventure. Join us and let's 
                    explore the world together!
                    </span>
                </div>
                <motion.div  class="divider" whileHover={{ scale: 1.5 }} />
                <div className='d-flex flex-row align-items-center' >
                    <TextSection>
                        <h3>
                            Party
                        </h3>
                        <p>
                            Enjoy vibrant nightlife and lively celebrations in our destination! Whether you're into dancing the night 
                            away at trendy clubs, sipping cocktails by the beach, or joining local festivities, we've got the perfect 
                            party scene to suit your style.
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img 
                            className='animated-image' 
                            src='https://img.freepik.com/premium-photo/people-in-the-pool-party-at-night-ai-art_154797-1645.jpg' 
                            alt='' 
                            width='100%' 
                            height='100%' 
                        />
                    </ImageSection>
                </div>
                <div className='d-flex flex-row align-items-center' >
                    <ImageSection>
                        <img 
                            className='animated-image' 
                            src='https://img.freepik.com/premium-photo/woman-painting-colorful-canvas-work-studio-generate-ai_98402-24524.jpg' 
                            alt='' 
                            width='100%' 
                            height='100%' 
                        />
                    </ImageSection>
                    <TextSection>
                        <h3>
                            Hobbie
                        </h3>
                        <p>
                            Discover your passion and unwind with a range of exciting hobbies while on vacation. 
                            From water sports and hiking to photography and culinary adventures, our destination 
                            offers endless opportunities to indulge in your favorite pastimes.
                        </p>
                    </TextSection>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <TextSection>
                        <h3>
                            Tourism
                        </h3>
                        <p>
                            Immerse yourself in the beauty and culture of our enchanting locale. Explore historic landmarks, 
                            savor delicious cuisine, and connect with the local community as you embark on an unforgettable 
                            journey filled with memorable experiences.
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img 
                            className='animated-image' 
                            src='https://templated.co/items/demos/caminar/images/pic06.jpg' 
                            alt='' 
                            width='100%' 
                            height='100%' 
                        />
                    </ImageSection>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <ImageSection>
                        <img 
                            className='animated-image' 
                            src='https://img.freepik.com/premium-photo/women-enjoying-a-live-concert-surrounded-by-a-lively-crowd-ai_431161-11615.jpg' 
                            alt='' 
                            width='100%' 
                            height='100%' 
                        />
                    </ImageSection>
                    <TextSection>
                        <h3>
                            Event
                        </h3>
                        <p>
                            Dive into a world of entertainment and cultural enrichment with our diverse lineup of events. 
                            From music festivals and art exhibitions to local fairs and sports competitions, there's 
                            always something exciting happening in our destination. Join us for a memorable event you won't want to miss!
                        </p>
                    </TextSection>
                </div>
                <motion.div  class="divider" whileHover={{ scale: 1.5 }} />
                <div className='sign-up-field mb-4 d-flex flex-row'>
                    <ItemSection>
                        <h3>Choose what you would like to visit</h3>
                        <div className='d-flex justify-content-center'>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-4 btn btn-outline-info'>
                                Cicling
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-4 btn btn-outline-info'>
                                Diving
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-4 btn btn-outline-info'>
                                Rafting
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-4 btn btn-outline-info'>
                                Dancing
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-4 btn btn-outline-info'>
                                Singing
                            </motion.div>
                        </div>
                    </ItemSection>
                </div>

                <div className="sign-up-field d-flex flex-column">
                    <h3 className="mb-4">events on every day</h3>
                    <Slideshow />
                </div>
                <div className="sign-up-field col-md-6 my-3 item-align-center justify-content-center m-auto">
                    <h3>Sign up and enjoy</h3>
                    <button onClick={showLoginForm}>Login</button>
                    <button onClick={showRegistrationForm}>Registration</button>
                    {isLoginFormVisible ? <LoginForm /> : <RegistrationForm />}
                </div>
            </div>
        </div>

    );
};

export default Content;