import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AparatureHttp from "../../../http/http-aparature";
import CreateUnitAparatureAttr from "../../../domain/CreateAparatureUnit";
import ExistAparatureUnit from "../../../http/http-exist-aparature";
import Aparature from "../../../domain/Aparature";
import { useParams } from "react-router-dom";

const ModalAddUnitAparature: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [aparatures, setAparatures] = useState<Array<Aparature> | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await AparatureHttp.listAparatures();
          if (data) {
            setAparatures(data);
          } else {
            console.log('No Aparatures data received');
          }
        } catch (error) {
          console.error('Error fetching Aparatures:', error);
        }
      };
  
      fetchData();
    }, []);

    const { id } = useParams<{ id: string }>();
    const [selectedAparature, setSelectedAparature] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
        
    const handleAddAparature = async () => {
        const newAparatureUnit: CreateUnitAparatureAttr = {
            id_unit: Number(id),
            id_aparature: selectedAparature,
            count,
        };

        console.log(id)
        
        const addedAparature = await ExistAparatureUnit.addExistAparature(newAparatureUnit);
        if (addedAparature) {
            console.log('Aparature added:', addedAparature);
            handleClose(); 
        } else {
            console.error('Failed to add aparature');
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>   
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Додати апаратуру</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Оберіть апарат:</Form.Label>
                            <Form.Control
                                as="select"
                                name='id_aparature'
                                onChange={(e) => setSelectedAparature(Number(e.target.value))}
                                value={selectedAparature}
                                required
                            > 
                               <option>Оберіть апарат зв`язку:</option>
                                {aparatures ? (
                                    aparatures.map((aparature) => (
                                        <option key={aparature.id} value={aparature.id}>{aparature.name}</option>
                                    ))
                                ) : (
                                    <option>Loading...</option>
                                )}
                            </Form.Control>
                            <Form.Label>Вкажіть кількість апаратури:</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                name='count'
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddAparature}> {/* Handle form submission on button click */}
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddUnitAparature;
