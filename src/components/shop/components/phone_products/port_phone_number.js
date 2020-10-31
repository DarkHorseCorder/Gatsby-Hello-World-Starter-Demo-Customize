import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  alert_root: {
    width: '100%',
    borderRadius: 0,
    '& > *': {
      borderRadius: 0,
    },
  },
  formControl: {
    width: '75%',
  },
  radio_btns: {
    alignItems: 'flex-start',
    paddingTop: '0',
    '& after': {
      marginLeft: theme.spacing(2),
    },
  },
  form_port_phone: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
  input: {
    display: 'none',
  },
}));

function PortPhoneNumber({ order_data, updatePhonePortOption, updatePhonePortAuthorization }) {
  const classes = useStyles();

  const [phone_port_option, setPhonePortOption] = useState(order_data.phone_port);
  const [show_port_number_form, setShowPortNumberForm] = useState((phone_port_option === 'YES') ? true : false);
  const [phone_port_name_error, setPhonePortNameError] = useState(false);
  const [phone_port_address_error, setPhonePortAddressError] = useState(false);
  const [phone_port_number_error, setPhonePortNumberError] = useState(false);

  const [phone_port_confirmed, setPhonePortConfirmed] = React.useState(false);
  const handlePhonePortConfirmationChange = (event) => {
    let errors = false
    // Perform local validation
    if (phone_port_name.length > 5) {
      setPhonePortNameError(false);
    } else {
      setPhonePortNameError(true);
      errors = true
    }
    if (phone_port_address.length > 10) {
      setPhonePortAddressError(false);
    } else {
      setPhonePortAddressError(true);
      errors = true
    }
    if (phone_port_number.length > 9) {
      setPhonePortNumberError(false);
    } else {
      setPhonePortNumberError(true);
      errors = true
    }
    // If local validation passes update localStorage and parent component
    if (errors === false) {
      console.log("event.target.checked:", event.target.checked)
      setPhonePortConfirmed(event.target.checked);

      localStorage.setItem("phone_port_name", phone_port_name);
      localStorage.setItem("phone_port_address", phone_port_address);
      localStorage.setItem("phone_port_number", phone_port_number);
      if (event.target.checked === true) {
        updatePhonePortAuthorization(true)
      } else {
        updatePhonePortAuthorization(false)
      }
    }
  };

  const [phone_port_name, setPhonePortName] = React.useState(localStorage.getItem("phone_port_name") || '');
  const handlePhonePortNameChange = (event) => {
    setPhonePortName(event.target.value);
    setPhonePortConfirmed(false);
  };

  const [image_file, setImageFile] = React.useState(null);
  const handleImageFileChange = (event) => {
    console.log(event.target.files[0]);
    setImageFile(event.target.files[0]);
  };

  const [phone_port_address, setPhonePortAddress] = React.useState(localStorage.getItem("phone_port_address") || '');
  const handlePhonePortAddressChange = (event) => {
    setPhonePortAddress(event.target.value);
    setPhonePortConfirmed(false);
  };

  const [phone_port_number, setPhonePortNumber] = React.useState(localStorage.getItem("phone_port_number") || '');
  const handlePhonePortNumberChange = (event) => {
    setPhonePortNumber(event.target.value);
    setPhonePortConfirmed(false);
  };

  const setPhonePort = (event) => {
    setPhonePortOption(event.target.value);
    updatePhonePortOption(event.target.value);
    if (event.target.value === 'YES') {
      setShowPortNumberForm(true);
    } else {
      setShowPortNumberForm(false);
    }
  };

  if (order_data.phone_package_id === 0) {
    return null;
  } else {
    return (
      <div className={clsx("mb-6 mx-6 pb-3 border border-gray-600 shadow-md", !order_data.validation_pass_port_number_option && 'border-red-600')}>
        {(order_data.validation_pass_port_number_option) ?
          null
          :
          <div className={classes.alert_root}>
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              You'll need to make a selection here.
            </Alert>
          </div>
        }
        <div className="px-6">
          <h2 className="text-lg md:text-xl font-semibold pt-2 grey-750">Would you like to keep your existing phone number?</h2>
          <FormControl component="fieldset">
            <RadioGroup aria-label="phone_port" name="phone_port" value={phone_port_option} onChange={setPhonePort}>
              <div className="md:flex md:content-start w-full px-0 md:px-10 pt-6 pb-5">
                <div className="md:w-1/2 align-top px-1 md:px-3">
                  <FormControlLabel value={'YES'} className={classes.radio_btns} control={<Radio style={{ paddingTop: 0 }} />} label="Yes, I want to keep my existing phone number" />
                </div>
                <div className="md:w-1/2 px-1 md:px-3 pt-3 md:pt-0">
                  <FormControlLabel value={'NO'} className={classes.radio_btns} control={<Radio style={{ paddingTop: 0 }} />} label="No, I will need a new phone number" />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          {show_port_number_form &&
            <div className="pt-2 px-2 md:px-6 border-t border-gray-400">
              <div className="py-3 md:px-5">
                <h1 className="text-lg md:text-xl grey-700 uppercase">Porting your number is easy, here's how:</h1>
                <p className="text-sm md:text-base pt-4 grey-700">When transferring your number it is important to <span className="font-semibold grey-800">not cancel your current phone provider before the transfer
                  is 100% complete</span>.</p>
                <p className="text-sm md:text-base pt-2 grey-700">If you cancel your existing phone service before the porting process has completed the transfer will fail and your number may be lost.
                An incorrect name or address will also cause the transfer to fail so please double-check that all information is correct.
                </p>
                <div className="pt-4">
                  <form className={classes.form_port_phone} noValidate autoComplete="off">
                    <h2 className="text-lg md:text-xl grey-700 font-semibold uppercase">Step 1:</h2>
                    <h3 className="text-sm md:text-base px-2 md:px-6 pt-2">Enter the account details exactly as stated on your most recent phone bill:</h3>
                    <div className="px-2 md:px-6 pt-3">
                      <TextField
                        id="phone_port_name"
                        label="Name"
                        value={phone_port_name}
                        color="secondary"
                        error={phone_port_name_error}
                        variant="outlined"
                        onChange={handlePhonePortNameChange}
                      />
                      <TextField
                        id="phone_port_address"
                        label="Address"
                        value={phone_port_address}
                        color="secondary"
                        error={phone_port_address_error}
                        variant="outlined"
                        onChange={handlePhonePortAddressChange}
                      />
                      <TextField
                        id="phone_port_number"
                        label="Phone Number"
                        value={phone_port_number}
                        color="secondary"
                        error={phone_port_number_error}
                        variant="outlined"
                        onChange={handlePhonePortNumberChange}
                      />
                    </div>
                  </form>

                  <h2 className="text-lg md:text-xl grey-700 font-semibold uppercase pt-4">Step 2:</h2>
                  <h3 className="text-sm md:text-base px-2 md:px-6 pt-2">Upload an image of your current phone bill with your account details clearly visible:</h3>
                  <div className="text-center my-5">
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      onChange={handleImageFileChange}
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Upload Image
                      </Button>
                    </label>
                  </div>
                  {(image_file == null) ?
                    null
                    :
                    <div className="text-center">
                      <i className="far fa-check-circle text-4xl" style={{ color: '#0b9b4a' }}></i>
                    </div>
                  }

                  {(order_data.validation_pass_authorized_to_port_number) ?
                    null
                    :
                    <div className={clsx("pt-4", classes.alert_root)}>
                      <Alert severity="error" variant="filled">
                        <AlertTitle>Error</AlertTitle>
                        You'll nee to confirm your account details.
                      </Alert>
                    </div>
                  }

                  <h2 className="text-lg md:text-xl grey-700 font-semibold uppercase pt-4">Step 3:</h2>
                  <h3 className="text-sm md:text-base px-2 md:px-6 pt-2">And finally, confirm that the phone number is yours:</h3>
                  <div className="flex items-start ml-2 md:ml-4 mb-6 px-6 pt-2">
                    <div className="pr-0">
                      <Checkbox
                        checked={phone_port_confirmed}
                        onChange={handlePhonePortConfirmationChange}
                        inputProps={{ 'aria-label': 'phone port confirmation' }}
                      />
                    </div>
                    <div className="flex-1 text-sm pt-2">
                      I confirm that I am the authorized account holder and approve the transfer of this number.
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl pt-6 text-canfone-red font-bold uppercase">Important</h3>
                  <h3 className="text-sm md:text-base px-2 md:px-6 pt-0">Do not cancel with your current phone provider until the transfer is 100% complete. We'll notify you when it is time to cancel with your phone provider.</h3>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default PortPhoneNumber;