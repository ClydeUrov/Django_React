import { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";

function Footer() {
    const [isFooterFixed, setIsFooterFixed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        const body = document.body;
        const html = document.documentElement;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        setIsFooterFixed(windowHeight === documentHeight);
        };

        // Подписываемся на событие resize
        window.addEventListener("resize", handleResize);

        // Вызываем обработчик при монтировании компонента
        handleResize();

        // Отписываемся от события при размонтировании компонента
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Navbar variant="dark" className={isFooterFixed ? "fixed-bottom" : ""}>
            <Container className="justify-content-center" variant="dark">
                <span className="text-light">Made in Ukraine © 2022-2023 v00.05</span>
            </Container>
        </Navbar>
    );
}

export default Footer;