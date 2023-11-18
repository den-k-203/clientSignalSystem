import { Button } from "react-bootstrap"
import { useState, useEffect } from 'react'
import AparatureHttp from "../../../../http/http-aparature";

interface AparatureRemoverProps {
    id: number;
}

const BtnRemoveAparature: React.FC<AparatureRemoverProps> = ({ id: initialId  }) => {
    const [id, setId] = useState<number>(initialId); 
    const [isDeleted, setIsDeleted] = useState<boolean | null>(null); 
  
    useEffect(() => {
      setId(initialId); 
    }, [initialId]);
  
    const handleDelete = async () => {
      if (id) {
        try {
          const deleted = await AparatureHttp.removeAparatureById(id);
          setIsDeleted(deleted);
          window.location.reload() 
        } catch (error) {
          console.error('Error deleting Aparature by ID:', error);
          setIsDeleted(false);
        }
      } else {
        console.log('Please provide a valid Aparature ID.');
      }
    };
    return(
        <>
            <Button onClick={handleDelete}>
                Видалити апарат
            </Button>
        </>
    )
}


export default BtnRemoveAparature