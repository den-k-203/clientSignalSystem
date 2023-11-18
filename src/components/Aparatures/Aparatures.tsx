import React from "react"
import CardApparature from "./CardAparature/CardApparature"
import Footer from "../Footer/Footer"
import ModalNewAparature from "./ModalAddAparature/ModalNewAparature"
import './style/index.scss'


const Aparatures: React.FC = () => {
    return (
        <>
            <div className="container">
                <div className="title">
                    Список доступних апаратів зв`язку
                </div>
                    <CardApparature/>
                        <div className="add-aparature">
                    <ModalNewAparature/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Aparatures