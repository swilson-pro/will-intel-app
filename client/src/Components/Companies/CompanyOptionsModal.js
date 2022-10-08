import 'rsuite/dist/rsuite.min.css'

import { Modal, Toggle, Button, ButtonToolbar, Placeholder, IconButton } from 'rsuite';
import { useState } from 'react';

import MenuIcon from '@rsuite/icons/Menu';

import EditCompanyDrawer from "./EditCompanyDrawer"

import {Visible, Unvisible, Others, UserBadge, Plus, Calendar, Trash, Edit } from '@rsuite/icons'

const CompanyOptionsModal = ({company, fetchCompany, deleteCompany}) => {


    const [open, setOpen] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <ButtonToolbar>
            {/* <Button style={{margin: '1.1em'}}appearance='ghost' color="blue" size='lg' onClick={handleOpen}>Read Description</Button> */}
            <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="xs"
                    icon={<MenuIcon/>}
                    onClick={handleOpen}
                    >
                        Options
                </IconButton>
        </ButtonToolbar>
        <Modal size='sm' overflow={overflow} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <EditCompanyDrawer className="card-button" company={company} fetchCompany={fetchCompany}/>
            <ButtonToolbar>
                <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Trash/>}
                    onClick={() => deleteCompany(company.id)}
                    >
                        Delete Company
                </IconButton>

            </ButtonToolbar>
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
export default CompanyOptionsModal