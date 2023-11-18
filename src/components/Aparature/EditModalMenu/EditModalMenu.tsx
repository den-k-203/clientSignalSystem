import { Button, Modal, Form } from "react-bootstrap"
import React, {useState, useEffect} from "react";
import Aparature from "../../../domain/Aparature";
import AparatureHttp from "../../../http/http-aparature";
import { useParams } from "react-router-dom";

const EditMenu: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams<{ id: string }>(); 
    const [aparatureData, setAparatureData] = useState<Partial<Aparature>>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAparatureById = async () => {
        try {
          const data = await AparatureHttp.getAparatureById(Number(id));
          if (data) {
            setAparatureData(data);
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
  
    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setAparatureData({ ...aparatureData, [name]: value });
    };
  
    const handleUpdate = async () => {
      try {
        const updatedAparature = await AparatureHttp.updateAparatureById(
          Number(id),
          aparatureData as Partial<Aparature>
        );
        if (updatedAparature) {
          console.log('Aparature updated:', updatedAparature);
        } else {
          console.error('Failed to update Aparature.');
        }
      } catch (error) {
        console.error('Error updating Aparature:', error);
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
                                value={aparatureData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Модель апаратури:</Form.Label>
                            <Form.Control
                                type='text'
                                name="model"
                                value={aparatureData.model}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Label>Оберіть картинку:</Form.Label>
                            <Form.Control
                                type="text"
                                name='image'
                                value={aparatureData.image}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Оберіть тип зв`язку:</Form.Label>
                            <Form.Control
                                as="select"
                                name='type_signal'
                                value={aparatureData.type_signal}
                                onChange={handleInputChange}
                                required
                            >
                               <option>Оберіть тип зв`язку</option>
                               <option value="Супутниковий">Супутниковий</option>
                               <option value="Радіо">Радіо</option>
                               <option value="Транкінговий">Транкінговий</option>
                               <option value="Фельд`єрсько-поштовий">Фельд`єрсько-поштовий</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Характеристика апаратури:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name='description'
                                value={aparatureData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default EditMenu