import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreateAparature from "../../../domain/CreateAparature";
import AparatureHttp from "../../../http/http-aparature";

const ModalNewAparature: React.FC = () => {
    const [show, setShow] = useState(false);
    const [aparatureData, setAparatureData] = useState<CreateAparature>({
        name: '',
        model: '',
        type_signal: '',
        description: '',
        image: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  
    const handleSubmit = async () => {
        try {
            if (!aparatureData.name || !aparatureData.model || !aparatureData.type_signal) {
                console.error('Please fill in all required fields.');
                return;
            }
            
            const response = await AparatureHttp.addAparatureToServer(aparatureData);
            if (response) {
                console.log('Aparature added:', response);
                handleClose();
            } else {
                console.error('Failed to add aparature.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setAparatureData({ ...aparatureData, [name]: value });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalNewAparature;
