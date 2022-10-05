import 'rsuite/dist/rsuite.min.css'

import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from 'rsuite';
import { useState } from 'react';

const DescriptionModal = ({company}) => {


    const [open, setOpen] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <ButtonToolbar>
            <Button style={{margin: '1.1em'}}appearance='ghost' color="blue" size='lg' onClick={handleOpen}>Read Description</Button>
        </ButtonToolbar>
        <Modal size='lg' overflow={overflow} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='bio'>{company.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="ghost">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="ghost">
            Cancel
          </Button>
        </Modal.Footer>

        </Modal>
        </div>
    )

}
export default DescriptionModal