import React from "react";
import Header from "../components/mains/Header";
// import Navigation from "../components/mains/Navigation";
import Content from "../components/mains/Content";
import Footer from "../components/mains/Footer";
import Comp from "../components/mains/Comp";


function Main(){
    return (
        <div className="content">
            <Header />
            {/* <Navigation />*/}
            <Content /> 
            <Comp />
            <Footer />
        </div>
    )
}

export default Main;
