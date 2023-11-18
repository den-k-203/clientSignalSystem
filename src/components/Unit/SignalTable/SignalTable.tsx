import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ExistAparatureUnit from '../../../http/http-exist-aparature';
import UnitAparaturetAttr from '../../../domain/UnitAparatureAttr';
import Unit from '../../../domain/Unit';
import Aparature from '../../../domain/Aparature';
import UnitAparatureAll from '../../../domain/UnitAparatureAll';

interface SignalTableProps {
  id: number;
}

const SignalTable: React.FC<SignalTableProps> = ({ id }) => {
  const [unitAparature, setUnitAparature] = useState<Array<UnitAparatureAll> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData = await ExistAparatureUnit.getListAparatureUnitExistbyId(id);
        
        if (fetchedData === null) {
          fetchedData = [];
        } else if (!Array.isArray(fetchedData)) {
          fetchedData = [fetchedData]; 
        }
        setUnitAparature(fetchedData);
      } catch (error) {
        setUnitAparature([]);
      }
    };
  
    fetchData();
  }, [id]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва апарату</th>
          <th>Кількість</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
      {unitAparature ? (
          unitAparature.map((aparature, index) => (
        <tr key={aparature.id}>
          <td>
            1
          </td>
          <td>
            Назва апарату
          </td>
          <td>
            Кількість
          </td>
          <td>
            <Button>
                Редагувати
            </Button>
          </td>
          <td>
            <Button className='btn-danger'>
                Видалити
            </Button>
          </td>
        </tr>
        ))):(<></>)}
      </tbody>
    </Table>
  );
}


const SignalTableComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <SignalTable  id={Number(id)}/>;
};

export default SignalTableComponent;