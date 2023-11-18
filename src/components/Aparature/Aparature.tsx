import React, { useState, useEffect } from "react"
import './style/index.scss'
import EditMenu from "./EditModalMenu/EditModalMenu"
import Footer from "../Footer/Footer"
import { useParams } from "react-router-dom"
import AparatureHttp from "../../http/http-aparature"
import Aparature from "../../domain/Aparature"

const AparatureComponent: React.FC = () => {    
    const { id } = useParams();
    const [aparature, setAparature] = useState<Aparature | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAparatureById = async () => {
        try {
          const data = await AparatureHttp.getAparatureById(Number(id)); 
          if (data) {
            setAparature(data);
          } else {
            console.error('Aparature not found.');
          }
        } catch (error) {
          console.error('Error fetching Aparature:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAparatureById();
    }, [id]);
  
    if (loading) {
      return <p>Loading...</p>; 
    }
  
    if (!aparature) {
      return <p>Aparature not found.</p>; 
    }
  
    
    return (
        <>
            <div className="container-aparature">
                <h1 className="title-aparature">
                    {aparature.name}
                </h1>
                <div className="context-aparature">
                    <div className="block-image-aparature">
                        <img src= {aparature.image} className="image-aparature" alt='aparature'/>
                    </div>
                    <div className="characteristic-data">
                        <div className="text-content">
                            Характеристика апаратури
                        </div>
                        <div className="text-area-aparature">
                           <span className="aparature-variables">Модель:</span> {aparature.model}<br/>
                           <span className="aparature-variables">Тип зв`язку:</span> {aparature.type_signal+"\n"}<br/>
                           <span className="aparature-variables">Про апарат:</span><br/> {aparature.description}
                        </div>
                        <div className="edit-menu-btn">
                            <EditMenu/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AparatureComponent