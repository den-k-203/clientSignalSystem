import React from "react";
import './style/index.scss'
import CardMenu from "./CardMenu/CardsMenu";
import ModalAddUnit from "./ModalAddUnit/ModalAddMenu";
import Footer from "../Footer/Footer";

const Units: React.FC = () => {
    return (
        <>
            <div className="container">
                <div className="title">
                    Список підрозділів
                </div>
                <CardMenu/>
                <div className="add-button">
                    <ModalAddUnit/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Units;