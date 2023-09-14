import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// const images = [
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnrS9YYA7ecDDz_ppZ7_Zh8FIi5VKb6wvKA&usqp=CAU',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1q_4E-pcAA_zQXVfMTfytvS4aAgMhclkjg&usqp=CAU',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX2B4g22q1AWV4d3jEMCFOyhoAK4e_oY20ug&usqp=CAU',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ179zTPwjyznj8v9dQopf9qx_7KNZqGalgXQ&usqp=CAU',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FMsZ18U5v230dv6PCogtqiw_0KkdOiNKtA&usqp=CAU',
// ];
const images = [
    'https://media.istockphoto.com/id/1226797666/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%B1%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D1%8E-%D0%BF%D0%B0%D1%80%D1%82%D1%96%D1%8F-%D0%BD%D0%B0%D0%B9%D0%BA%D1%80%D0%B0%D1%89%D0%B5-%D0%B2-%D0%BC%D1%96%D1%81%D1%8C%D0%BA%D0%BE%D0%BC%D1%83-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%96-%D0%B7-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%BC.jpg?s=1024x1024&w=is&k=20&c=SwOzis4PQ7zn1UHx3H_p7hmtN8Qa1d1cGmDKvnzVvVE=',
    'https://media.istockphoto.com/id/502583687/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%B8%D0%BD%D0%B3%D0%BE%D0%B2%D0%B5-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F-%D0%BF%D0%BE%D0%B4%D1%96%D1%8F-%D1%81%D0%B8%D0%BD%D1%96%D0%B9-%D1%84%D0%BE%D0%BD.jpg?s=1024x1024&w=is&k=20&c=F8NJPVKRQDeqkZw-waEvl9xRG0Yuh6gEhtbn2P_m5UU=',
    'https://media.istockphoto.com/id/1138412433/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%BA%D0%B2%D1%96%D1%82%D0%BA%D0%BE%D0%B2%D0%B5-%D1%88%D0%BE%D1%83-%D1%89%D0%BE-%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D1%83%D1%94-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82%D0%B0.jpg?s=1024x1024&w=is&k=20&c=gDCJ2FpIIfZaNzlINMpd-V11gLwaC4uBRByTy0414fo=',
    'https://media.istockphoto.com/id/1281092682/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%B0%D1%84%D1%96%D1%88%D0%B0-%D0%B7%D0%B8%D0%BC%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D1%81%D0%B2%D1%8F%D1%82%D0%BA%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%B1%D0%B0%D0%B7%D0%B0%D1%80%D1%83.jpg?s=1024x1024&w=is&k=20&c=Dbd0oxKqaWQxaB-V4_5CizKXFkvCHiBS4lw8YemFwgM=',
    'https://media.istockphoto.com/id/460430043/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D1%87%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B8%D0%B9-%D0%B1%D1%96%D0%BB%D0%BE-%D1%81%D0%B8%D0%BD%D1%96%D0%B9-%D0%BF%D1%96%D0%BA%D0%BD%D1%96%D0%BA-%D1%87%D0%B5%D1%82%D0%B2%D0%B5%D1%80%D1%82%D0%B5-%D0%BB%D0%B8%D0%BF%D0%BD%D1%8F-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F.jpg?s=1024x1024&w=is&k=20&c=CeG7RMZkfHSx-rQR4NqGAFFLziFfbngvylBcrTuFbHc=',
    'https://media.istockphoto.com/id/470889840/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%BC%D0%B8%D0%BB%D0%B8%D0%B9-%D1%87%D0%B8%D0%BB%D1%96-cookoff-%D0%BF%D0%B0%D1%80%D1%82%D1%96%D1%8F-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD.jpg?s=1024x1024&w=is&k=20&c=IPuX_OhQ3xhJAEtSnIvhYZWziT4kMbMZVLuYZnli1ME=',
    'https://media.istockphoto.com/id/1202124141/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%B7-%D0%B4%D0%BD%D0%B5%D0%BC-%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D0%B3%D0%BE-%D0%B2%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0-%D1%96%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D1%96%D1%8F-%D0%B4%D0%BE-%D1%81%D0%B2%D1%8F%D1%82%D0%B0-14-%D0%BB%D1%8E%D1%82%D0%BE%D0%B3%D0%BE-%D0%B4%D0%B0%D1%82%D0%B0-%D0%BD%D0%B0.jpg?s=1024x1024&w=is&k=20&c=bH1cFk0BasgyEdikW6DSkFdFC961SvUKkIkHcPP-Z40=',
    'https://media.istockphoto.com/id/535039941/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D1%80%D0%B5%D1%82%D1%80%D0%BE-%D1%82%D0%B0%D1%94%D0%BC%D0%BD%D0%B8%D1%86%D1%8F-%D0%BA%D0%BD%D0%B8%D0%B6%D0%BA%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BA%D0%BB%D1%83%D0%B1-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F-%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82.jpg?s=1024x1024&w=is&k=20&c=bwVYq2xByAPzx3m8zFsDmWLJu86ajSiy-gYxEk07ij8='
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