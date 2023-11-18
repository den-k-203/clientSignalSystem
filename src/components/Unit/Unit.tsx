import React, {useEffect, useState} from "react"
import './style/index.scss'
import UnitHttp from "../../http/http-unit";
import { useParams } from "react-router-dom";
import Unit from "../../domain/Unit";
import EditUnitModal from "./EditUnitModal/EditUnitModal";
import SignalTable from "./SignalTable/SignalTable";
import { Button } from "react-bootstrap";
import ModalAddUnitAparature from "./ModalAddAparatureUnit/ModalAddAparatureExistUnit";

const UnitComponent: React.FC = () => {
    const { id } = useParams();
    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUnitById = async () => {
        try {
          const data = await UnitHttp.getUnitById(Number(id)); 
          if (data) {
            setUnit(data);
          } else {
            console.error('Unit not found.');
          }
        } catch (error) {
          console.error('Error fetching Unit:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUnitById();
    }, [id]);
  
    if (loading) {
      return <p>Loading...</p>; 
    }
  
    if (!unit) {
      return <p>Unit not found.</p>; 
    }

    return (
        <div className="container-unit">
            <h1 className="title">
                {unit.name}
            </h1>
            <div className="image-unit">
                <img src={unit.image} className="img-unit" alt="Azov"/>
            </div>
            <div className="info-unit">
                <div className="info-signal">
                    <div className="table-sinal-info">
                        Потрібно апаратури в підрозділі
                    <SignalTable/>
                    <ModalAddUnitAparature/>
                    </div>
                    <div className="table-sinal-info">
                        Інснуюча апаратура в підрозділі
                    <SignalTable/>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>   
                    </Button>
                    </div>
                </div>
            </div>
            <div className="modal-edit">
                <EditUnitModal/>
            </div>
        </div>
    ) 
}

export default UnitComponent