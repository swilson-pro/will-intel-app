import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

import { useEffect, useState } from 'react';

const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const ProdContactsDrawer = ({company, handleContactClick }) => {


  const [size, setSize] = useState('lg');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();


  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  return (
    <>

      <hr />
      <ButtonToolbar>
        <IconButton appearance="ghost" color="blue" icon={<AngleLeftIcon />} onClick={() => handleOpen('right')}>
            Contacts at Company
        </IconButton>
      </ButtonToolbar>
      <Drawer size='lg' placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Contacts at Company</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {company.contacts?.map((contact) => {
                                return (
                                    <li className='products-list' key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                                )
                            })}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default ProdContactsDrawer