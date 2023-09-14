import React from "react";
import Header from "../components/mains/Header";
// import Navigation from "../components/mains/Navigation";
import Content from "../components/mains/Content";
import Footer from "../components/mains/MainFooter";


function Main(){
    return (
        <div className="main-content">
            <Header />
            {/* <Navigation />*/}
            <Content />
            <Footer />
        </div>
    )
}

export default Main;
