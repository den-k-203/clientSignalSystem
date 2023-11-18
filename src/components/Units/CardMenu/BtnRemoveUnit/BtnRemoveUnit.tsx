import React, {useState, useEffect} from "react"
import { Button } from "react-bootstrap";
import UnitHttp from "../../../../http/http-unit";

interface AparatureRemoverProps {
    id: number;
}

const BtnRemoveUnit: React.FC<AparatureRemoverProps> = ({ id: initialId }) => {
    const [id, setId] = useState<number>(initialId); 
    const [isDeleted, setIsDeleted] = useState<boolean | null>(null); 
  
    useEffect(() => {
      setId(initialId); 
    }, [initialId]);
  
    const handleDelete = async () => {
      if (id) {
        try {
          const deleted = await UnitHttp.removeUnitById(id);
          setIsDeleted(deleted);
          window.location.reload() 
        } catch (error) {
          console.error('Error deleting Unit by ID:', error);
          setIsDeleted(false);
        }
      } else {
        console.log('Please provide a valid Unit ID.');
      }
    };
    return(
        <>
            <Button onClick={handleDelete}>
                Видалити підрозділ
            </Button>
        </>
    )
}

export default BtnRemoveUnit