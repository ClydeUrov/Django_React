import React, {useRef} from 'react';
import { motion, useInView } from "framer-motion";
import '../mains/styles.css'
import Slideshow from "../mains/Slideshow"

function TextSection({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const textStyle = {
        transform: isInView ? "none" : "translateX(300px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }

    return (
        <div className='col-6 mb-4 d-flex flex-row align-items-start' ref={ref}>
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

    return (
        <div className='text-center text-white body-content m-auto'>
            <div className='tourism'>
                <div className='content-text text-center mb-5'>
                    <h2 className='animated-text'>Welcome to the World of Travel</h2>
                    <p className='animated-text'>
                        On this site you can find tours, activities, events, parties and much more that interest you.
                        Invite friends, find like-minded people and spend time to the fullest!
                    </p>
                </div>
                <div className='mb-4 d-flex flex-row align-items-start' >
                    <TextSection>
                        <h3>
                            Party topic
                        </h3>
                        <p>
                            Some party text Some party text Some party text Some party text
                            Some party text Some party text Some party text
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605216_19.jpg' alt='' width='100%' height='100%' />
                    </ImageSection>
                </div>
                <div className='mb-4 d-flex flex-row align-items-start' >
                    <TextSection>
                        <h3>
                            Hobbie topic
                        </h3>
                        <p>
                        Some hobbie text Some hobbie text Some hobbie text Some hobbie text
                            Some hobbie text Some hobbie text Some hobbie text
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605248_9.jpg' alt='' width='100%' height='100%' />
                    </ImageSection>
                </div>
                <div className='mb-4 d-flex flex-row align-items-start'>
                    <TextSection>
                        <h3>
                            Tourism topic
                        </h3>
                        <p>
                            Some tourism text Some tourism text Some tourism text Some tourism text
                            Some tourism text Some tourism text Some tourism text
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605271_10.jpg' alt='' width='100%' height='100%' />
                    </ImageSection>
                </div>
                <div className='mb-4 d-flex flex-row align-items-start'>
                    <TextSection>
                        <h3>
                            Event topic
                        </h3>
                        <p>
                            Some event text Some event text Some event text Some event text
                            Some event text Some event text Some event text
                        </p>
                    </TextSection>
                    <ImageSection>
                        <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605271_10.jpg' alt='' width='100%' height='100%' />
                    </ImageSection>
                </div>
                <div className='mb-4 d-flex flex-row align-items-start'>
                    <ItemSection>
                        <h3>Choose what you would like to visit</h3>
                        <div className='d-flex'>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-3 btn btn-outline-info'>
                                Cicling
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-3 btn btn-outline-info'>
                                Diving
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-3 btn btn-outline-info'>
                                Rafting
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-3 btn btn-outline-info'>
                                Dancing
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.8 }} className='m-3 btn btn-outline-info'>
                                Singing
                            </motion.div>
                        </div>
                    </ItemSection>
                </div>
                <div className="d-flex flex-column">
                    <h3 className="mb-4">User Reviews</h3>
                    <Slideshow />
                </div>
            </div>
        </div>

            // {/* <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
            //     <div>
            //         hello world
            //     </div>
            //     <p>Show me first</p>
            //     <p>Show me thecond</p>
            // </Animated>
            // <Animated animationIn="bounceInLeft" animationInDuration={5000} isVisible={true}>
            //     <p>Show me therd!!!</p>
            // </Animated> */}
            // <div>
            //     <motion.div whileHover={{ scale: 2 }}>
            //             <div>
            //                 hello world
            //             </div>
            //     </motion.div>
            //     <motion.div drag whileDrag={{ scale: 2 }}>
            //             <div>
            //                 hello world
            //             </div>
            //     </motion.div>
            //     <div>
            //         <motion.div animate={{rotate: [0, 200, 200, 0]}} transition={{ repeat: 2, duration: 5 }}>
            //                 <div>
            //                     hello world
            //                 </div>
            //         </motion.div>
            //     </div>

            // </div>


    );
};

export default Content;