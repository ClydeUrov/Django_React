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
        // <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '39vh' }}>
        <div className="justify-content-center flex-column">
            <div className="m-auto" style={{ minHeight: '300px', width: '100%' }}>
            <AnimatePresence>
                {images.map((image, index) => (
                <div key={index} className="position-relative d-flex justify-content-center">
                    {/* Следующая картинка */}
                    <motion.img
                    src={images[(currentImage + 1) % images.length]}
                    alt={`Image ${currentImage + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.09 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(90%) scale(0.8)',
                        height: '270px',
                        width: '270px',
                        borderRadius: '20%'
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
                    style={{ 
                        position: 'absolute', 
                        height: '300px', 
                        width: '300px', 
                        borderRadius: '20%',
                        zIndex: 1
                    }}
                    />

                    {/* Предыдущая картинка */}
                    <motion.img
                    src={images[(currentImage - 1 + images.length) % images.length]}
                    alt={`Image ${currentImage - 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.09 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        transform: 'translateX(-90%) scale(0.8)',
                        height: '270px',
                        width: '270px',
                        borderRadius: '20%'
                    }}
                    />
                </div>
                ))}
            </AnimatePresence>
            </div>
            <div className="d-flex justify-content-center mt-3">
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
                    backgroundColor: currentImage === index ? 'black' : 'white'
                }}
                />
            ))}
            </div>
        </div>
    );
};

export default Slideshow;