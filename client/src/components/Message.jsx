import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const Message = ({children,type,title}) =>
{
  const [open, setOpen] = React.useState(true);
  return (
    <Collapse in={open}>
      <Alert severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() =>
            {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
      <AlertTitle>{title}</AlertTitle>
      {children}
      </Alert>
    </Collapse>
  )
}

export default Message
