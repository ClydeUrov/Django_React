import React, { useState } from 'react';
import { Animated } from "react-animated-css";
import LazyLoad from 'react-lazy-load';
import { motion, useInView } from "framer-motion";

const Content = () => {
    

    return (
        <div className='content bg-dark text-center text-white'>
            
            <div className='container mx-4'>
                <div className='content-text text-center mb-5 pt-5'>
                    <h2 className='animated-text'>Welcome to the World of Travel</h2>
                    <p className='animated-text'>
                        On this site you can find tours, activities, events, parties and much more that interest you.
                        Invite friends, find like-minded people and spend time to the fullest!
                    </p>
                </div>
                <div className='content-images d-flex flex-column align-items-center'>
                    <div className='parties mb-4 d-flex flex-row align-items-start'>
                        <div className='mx-4 w-50'>
                            <LazyLoad debounce={false} offsetVertical={-9000}>
                                <Animated animationIn="bounceInLeft" animationInDuration={2000} isVisible={true}>
                                    <h3>
                                        Some party text Some party text Some party text Some party text Some party text
                                        Some party text Some party text Some party text
                                    </h3>
                                </Animated>
                            </LazyLoad>
                        </div>
                        <LazyLoad debounce={false} offsetVertical={500}>
                            <Animated animationIn="fadeInUp" animationInDuration={2000} isVisible={true}>
                                <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605216_19.jpg' alt='' width='500' height='300' />
                            </Animated>
                        </LazyLoad>
                    </div>
                    <div className='hobbies mb-4 d-flex flex-row align-items-start'>
                        <div className='mx-4 w-50'>
                            <LazyLoad debounce={true} offsetVertical={500}>
                                <Animated animationIn="bounceInLeft" animationInDuration={2000} isVisible={true}>
                                    <h3>
                                        Some hobbie text Some hobbie text Some hobbie text Some hobbie text Some hobbie text
                                        Some hobbie text Some hobbie text Some hobbie text
                                    </h3>
                                </Animated>
                            </LazyLoad>
                        </div>
                        <LazyLoad debounce={true} offsetVertical={500}>
                            <Animated animationIn="fadeInUp" animationInDuration={2000} isVisible={true}>
                                <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605248_9.jpg' alt='' width='500' height='300' />
                            </Animated>
                        </LazyLoad>
                    </div>
                    <div className='tourism mb-4 d-flex flex-row align-items-start'>
                        <div className='mx-4 w-50'>
                            <LazyLoad debounce={true} offsetVertical={500}>
                                <Animated animationIn="bounceInLeft" animationInDuration={2000} isVisible={true}>
                                    <h3>
                                        Some tourism text Some tourism text Some tourism text Some tourism text Some tourism text
                                        Some tourism text Some tourism text Some tourism text
                                    </h3>
                                </Animated>
                            </LazyLoad>
                        </div>
                        <LazyLoad debounce={true} offsetVertical={500}>
                            <Animated animationIn="fadeInUp" animationInDuration={2000} isVisible={true}>
                                <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605271_10.jpg' alt='' width='500' height='300' />
                            </Animated>
                        </LazyLoad>
                    </div>
                </div>
            </div>

            <LazyLoad debounce={true} offsetVertical={500}>
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <div>
                        hello world
                    </div>
                    <p>Show me first</p>
                    <p>Show me thecond</p>
                </Animated>
            </LazyLoad>
            <LazyLoad debounce={true} offsetVertical={500}>
                <Animated animationIn="bounceInLeft" animationInDuration={5000} isVisible={true}>
                    <p>Show me therd!!!</p>
                </Animated>
            </LazyLoad>
            <div>
                {/* <motion.div 
                    animate={{ x: move ? 200 : -200}}
                    transition={{ type: "spring", bounce: 50}}
                    onClick={() => {
                        setMove(!move);
                    }}>
                        <div>
                            hello world
                        </div>
                </motion.div> */}
                <motion.div whileHover={{ scale: 2 }}>
                        <div>
                            hello world
                        </div>
                </motion.div>
                <motion.div drag whileDrag={{ scale: 2 }}>
                        <div>
                            hello world
                        </div>
                </motion.div>
                {/* <motion.div drag="x" dragConstraints={{ left: 50 }}>
                        <div>
                            hello world
                        </div>
                </motion.div> */}
                <div>
                    <motion.div animate={{rotate: [0, 200, 200, 0]}} transition={{ repeat: 2, duration: 5 }}>
                            <div>
                                hello world
                            </div>
                    </motion.div>
                </div>

                
            </div>
            
        </div>
    );
};

export default Content;