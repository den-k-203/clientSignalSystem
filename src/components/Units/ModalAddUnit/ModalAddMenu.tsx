import React, { useState } from "react"
import './style/index.scss'
import { Button, Modal, Form } from "react-bootstrap"
import CreateUnit from "../../../domain/CreateUnit"
import UnitHttp from "../../../http/http-unit"

const ModalAddUnit: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [unitData, setUnitData] = useState<CreateUnit>({
        name: '',
        image: '',
      });
    
      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        setUnitData({ ...unitData, [name]: value });
      };
    
      const handleSubmit = async () => {
        try {
          const addedUnit = await UnitHttp.addUnitToServer(unitData); 
          if (addedUnit) {
            console.log('Unit added:', addedUnit);
          } else {
            console.error('Failed to add unit.');
          }
          window.location.reload() 
        } catch (error) {
          console.error('Error adding unit:', error);
        }
      };
    
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>      
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Додати підрозділ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>
                        Ім`я підрозділу`:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={unitData.name}
                      onChange={handleInputChange}
                      placeholder="Enter unit name"
                    />
                     <Form.Label>
                        Оберіть картинку:
                    </Form.Label>
                    <Form.Control
                       type="text"
                       name="image"
                       value={unitData.image}
                       onChange={handleInputChange}
                       placeholder="Enter unit image"
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddUnit