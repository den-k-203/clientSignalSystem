import React, {useEffect, useState} from "react"
import './style/index.scss'
import AparatureHttp from "../../../http/http-aparature";
import Aparature from "../../../domain/Aparature";
import BtnRemoveAparature from "./RemoveAparature/BtnRemoveAparature";
import { Link } from "react-router-dom";

const CardApparature: React.FC = () => {
    const [aparatures, setAparatures] = useState<Array<Aparature> | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await AparatureHttp.listAparatures();
          if (data) {
            console.log(data)
            setAparatures(data);
          } else {
             console.log()
          }
        } catch (error) {
          console.error('Error fetching Aparatures:', error);
        }
      };
  
      fetchData();
    }, []);
    
    return ( 
        <div className="cards-menu">
          {aparatures ? (
             aparatures.map((aparature) => (
                <Link to={`/aparature/${aparature.id}`} >
                  <div className="card" key={aparature.name}>
                          <img src={aparature.image} className="card-image" alt="Starlink"/>
                          <div className="model-apparature">
                            Назва: {aparature.name}
                          </div>
                          <div className="model-apparature">
                            Модель: {aparature.model}
                          </div>
                          <div className="type-aparature">
                            Тип зв`язку: {aparature.type_signal}
                          </div>
                          <BtnRemoveAparature id={aparature.id}/>
                  </div>
                </Link>
           ))): (   
            <p>Loading...</p>
          )}
        </div>
    )
}

export default CardApparature