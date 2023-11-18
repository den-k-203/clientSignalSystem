import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import './style/index.scss'
import Unit from "../../../domain/Unit";
import UnitHttp from "../../../http/http-unit";
import BtnRemoveUnit from "./BtnRemoveUnit/BtnRemoveUnit";


const CardMenu: React.FC = () =>{
    const [units, setUnits] = useState<Array<Unit> | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUnits = async () => {
        try {
          const unitList = await UnitHttp.listUnits();
          if (unitList) {
            setUnits(unitList);
          } else {
            console.error('Failed to fetch units.');
          }
        } catch (error) {
          console.error('Error fetching units:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUnits();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!units || units.length === 0) {
      return <p>No units found.</p>;
    }
    
    return (
        <div className="cards-menu">
               {units.map((unit) => (
                <div className="card" key={unit.id}>
                    <Link to={`/unit/${unit.id}`}>
                        <img src={unit.image} className="card-image" alt={unit.name}/>
                        <div className="card-title">
                           {unit.name}
                        </div>
                    </Link>
                    <BtnRemoveUnit id={unit.id}/>
                </div>
               ))}
        </div>
    )
}

export default CardMenu;