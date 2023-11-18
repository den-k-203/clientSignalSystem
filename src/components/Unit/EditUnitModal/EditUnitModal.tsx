import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import UnitHttp from "../../../http/http-unit";
import Unit from "../../../domain/Unit";
import { Button, Form, Modal } from "react-bootstrap";

const EditUnitModal: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams<{ id: string }>(); 
    const [unitData, setUnitData] = useState<Partial<Unit>>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUnitById = async () => {
        try {
          const data = await UnitHttp.getUnitById(Number(id));
          if (data) {
            setUnitData(data);
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
  
    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setUnitData({ ...unitData, [name]: value });
    };
  
    const handleUpdate = async () => {
      try {
        const updatedUnit = await UnitHttp.updateAparatureById(
          Number(id),
          unitData as Partial<Unit>
        );
        if (updatedUnit) {
          console.log('Unit updated:', updatedUnit);
        } else {
          console.error('Failed to update Unit.');
        }
      } catch (error) {
        console.error('Error updating Unit:', error);
      }
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  

    return (
        <>
           <Button variant="primary" onClick={handleShow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </Button>
           
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Редагувати апаратуру</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Назва апаратури:</Form.Label>
                            <Form.Control
                                type='text'
                                name="name"
                                value={unitData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Оберіть картинку:</Form.Label>
                            <Form.Control
                                type="text"
                                name='image'
                                value={unitData.image}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрити
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleUpdate}>
                            Зберегти зміни
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default EditUnitModal;