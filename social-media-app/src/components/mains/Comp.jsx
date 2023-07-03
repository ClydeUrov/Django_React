import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Animated } from "react-animated-css";
import "./styles.css";

function Section({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section ref={ref}>
        <span
            style={{
            transform: isInView ? "none" : "translateY(-400px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
            }}
        >
            {children}
        </span>
        </section>
    );
}

export default function App() {
    return (
        <div className="content">
            <Section>Animate</Section>
            <Section>
            <div className="d-flex">
                <Animated animationIn="bounceInLeft" animationInDuration={2000} isVisible={true}>
                    <h3>
                        Some party text Some party text Some party text Some party text Some party text
                        Some party text Some party text Some party text
                    </h3>
                </Animated>
                <Animated animationIn="fadeInUp" animationInDuration={2000} isVisible={true}>
                    <img className='animated-image' src='https://klike.net/uploads/posts/2019-11/1574605216_19.jpg' alt='' width='100%' height='100%' />
                </Animated>
            </div>
            </Section>
            <Section>when</Section>
            <Section>in</Section>
            <Section>view!</Section>
            <Section>
                <div>
                    <motion.div animate={{rotate: [0, 200, 200, 0]}} transition={{ repeat: 2, duration: 5 }}>
                        <div>
                            Реклама!
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}