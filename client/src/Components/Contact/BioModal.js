import 'rsuite/dist/rsuite.min.css'

import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from 'rsuite';
import { useState } from 'react';

const BioModal = ({contact}) => {


    const [open, setOpen] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <ButtonToolbar>
            <Button size='lg' onClick={handleOpen}>Read Bio</Button>
        </ButtonToolbar>
        <Modal size='lg' overflow={overflow} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='bio'>{contact.bio}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>

        </Modal>
        </div>
    )

}
export default BioModal