import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnrS9YYA7ecDDz_ppZ7_Zh8FIi5VKb6wvKA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1q_4E-pcAA_zQXVfMTfytvS4aAgMhclkjg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX2B4g22q1AWV4d3jEMCFOyhoAK4e_oY20ug&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ179zTPwjyznj8v9dQopf9qx_7KNZqGalgXQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSEMFR7a7f8tG8hFMkVZgcJvztD4hrHPxVJA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FMsZ18U5v230dv6PCogtqiw_0KkdOiNKtA&usqp=CAU',

];

const Slideshow = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Интервал в миллисекундах, здесь 3000 мс (3 секунды)

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleDotClick = (index) => {
        setCurrentImage(index);
    };

    return (
        <div className="d-flex justify-content-center position-relative align-items-center flex-column" style={{height: '39vh'}}>
            <div className="d-flex" style={{height: '39vh', width: '30vh'}}>
                <AnimatePresence>
                {images.map((image, index) => (
                <div key={index}>
                    {/* Следующая картинка */}
                    <motion.img
                    src={images[(currentImage + 1) % images.length]}
                    alt={`Image ${currentImage + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(80%) scale(0.7)',
                    }}
                    />

                    {/* Текущая картинка */}
                    <motion.img
                    src={image}
                    alt={`Image ${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentImage === index ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', maxHeight: '100%' }}
                    />

                    {/* Предыдущая картинка */}
                    <motion.img
                    src={images[(currentImage - 1 + images.length) % images.length]}
                    alt={`Image ${currentImage - 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(-80%) scale(0.7)',
                        maxHeight: '100%',
                    }}
                    />
                </div>
                ))}

                        {/*
                    // <motion.img
                    //     key={index}
                    //     src={image}
                    //     className='rounded-5'
                    //     alt={`Image ${index + 1}`}
                    //     initial={{ opacity: 0 }}
                    //     animate={{ opacity: currentImage === index ? 1 : 0 }}
                    //     exit={{ opacity: 0 }}
                    //     transition={{ duration: 0.5 }}
                    //     style={{ position: 'absolute'}}
                    // />
                    */}
                
                </AnimatePresence>
            </div>
            <div className='d-flex justify-content-center' style={{ justifyContent: 'center', position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
            {images.map((_, index) => (
                <span
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    margin: 5,
                    cursor: 'pointer',
                    backgroundColor: currentImage === index ? 'black' : 'white',
                }}
                />
            ))}
            </div>
        </div>
    );
};

export default Slideshow;