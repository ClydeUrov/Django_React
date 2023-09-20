import React from "react";
import Header from "../components/mains/Header";
// import Navigation from "../components/mains/Navigation";
import Content from "../components/mains/Content";
import MainFooter from "../components/mains/MainFooter";


function Main(){
    return (
        <div className="main-content">
            <Header />
            {/* <Navigation />*/}
            <Content />
            <MainFooter />
        </div>
    )
}

export default Main;
