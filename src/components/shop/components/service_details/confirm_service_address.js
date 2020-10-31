import React from 'react';
// import clsx from 'clsx';
// import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
  textfield_root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '100%',
    },
  },
  alert_root: {
    width: '100%',
    borderRadius: 0,
    '& > *': {
      borderRadius: 0,
    },
  },
}));

function ConfirmServiceAddress({order_data, updateAddress, lang}) {
  const classes = useStyles();

  return (
    <div className="mb-6 mx-6 pb-3 border border-gray-600 shadow-md">
      <div className="px-4">
        <h2 className="text-xl md:text-2xl font-semibold pt-2 grey-750">{ (lang === "en") ? "Service Address" : "Adresse de service"}</h2>
        <div className="px-0 md:px-3">
          <form className={classes.textfield_root} noValidate autoComplete="off">
            <TextField 
              defaultValue={order_data.service_address}
              color="secondary"
              id="outlined-basic" 
              InputProps={{
                readOnly: true,
              }}
              variant="outlined" 
            />
          </form>
        </div>
        <div className="ml-0 md:ml-5 pt-4 pb-2">
          <Button 
            variant="contained"
            color="secondary" 
            size="small" 
            value={"5"}
            onClick={updateAddress}>
            { (lang === "en") ? "Update Address" : "Nouvelle adresse"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmServiceAddress;