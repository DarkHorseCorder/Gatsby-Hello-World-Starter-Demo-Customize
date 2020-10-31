import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
}));

function PortPhoneNumber({order_data, updatePhonePortStatus, updateCurrentServiceProvider}) {
  const classes = useStyles();

  const [phone_port, setPhonePortVal] = useState('');
  const [show_port_number_form, setShowPortNumberForm] = useState(false);

  const setPhonePort = (event) => {
    let phone_port = event.target.value;
    setPhonePortVal(phone_port);
    updatePhonePortStatus(phone_port);
    if (phone_port === 'YES') {
      setShowPortNumberForm(true);
    } else {
      setShowPortNumberForm(false);
    }
  };

  if (order_data.phone_package_id === 0) {
    return null;
  } else {
    return (
      <div className={clsx("mb-6 mx-6 pb-6 border border-gray-600 shadow-md", !order_data.verification_passed_phone_port && 'border-red-600')}>
        {(order_data.verification_passed_phone_port) ?
          null
          :
          <div className={classes.alert_root}>
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              We're missing a selection here.
            </Alert>
          </div>
        }
        <div className="px-6">
          <h2 className="text-xl md:text-2xl font-semibold pt-2 grey-750">Would you like to keep your existing phone number?</h2>
          <FormControl component="fieldset">
            <RadioGroup aria-label="phone_port" name="phone_port" value={order_data.phone_port} onChange={setPhonePort}>
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
                <p className="text-sm md:text-base pt-1 grey-700">If you cancel your service before the port is completed the transfer will fail and your number may be lost. 
                  Other errors such as an incorrect name or address will cause the transfer to fail so please double-check all information 
                  is correct.
                </p>
                <div className="pt-4">
                  <form>
                    <h2 className="text-lg md:text-xl grey-700">Step 1:</h2>
                    <h3 className="text-sm md:text-base px-2 md:px-6 pt-2">Enter the account details exactly as stated on your most current phone bill:</h3>
                    <div className="w-full max-w-xl mt-2 md:mt-6 px-2 md:px-6">
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                          <label className="block grey-600 font-semibold md:text-right mb-1 md:mb-0 pr-4">
                            Name
                          </label>
                        </div>
                        <div className="md:w-3/4">
                          <input className="appearance-none border border-gray-500 rounded w-full py-2 px-4 grey-600 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="inline-full-name" type="text" />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                          <label className="block grey-600 font-semibold md:text-right mb-1 md:mb-0 pr-4">
                            Address
                          </label>
                        </div>
                        <div className="md:w-3/4">
                          <input className="appearance-none border border-gray-500 rounded w-full py-2 px-4 grey-600 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="inline-full-name" type="text" />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                          <label className="block grey-600 font-semibold md:text-right mb-1 md:mb-0 pr-4">
                            Phone Number
                          </label>
                        </div>
                        <div className="md:w-3/4">
                          <input className="appearance-none border border-gray-500 rounded w-full py-2 px-4 grey-600 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="inline-full-name" type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="md:flex md:items-center ml-2 md:ml-8 mb-6">
                      <label className="block grey-600 font-semibold">
                        <input className="mr-2 leading-tight" type="checkbox" />
                        <span className="text-sm">
                          I confirm that I am the authorized account holder and approve the transfer of this number
                        </span>
                      </label>
                    </div>
  
                    <h2 className="text-lg md:text-xl grey-700">Step 2:</h2>
                    <h3 className="text-sm md:text-base px-2 md:px-6 pt-2">Upload an image of your current phone bill with your account details clearly visible:</h3>
                    <div className="text-center mt-3 mb-6">
                      <button className="shadow barlow-button-red-grey text-lg md:text-2xl px-4 md:px-6 py-1 md:py-2 m-2 rounded" type="button">
                        Upload Image
                      </button>
                    </div>
                  </form>
  
                  <h2 className="text-lg md:text-xl grey-700">Step 3:</h2>
                  <h3 className="text-sm md:text-base px-2 md:px-6 pt-2 font-semibold uppercase">This is important.</h3>
                  <h3 className="text-sm md:text-base px-2 md:px-6 pt-1 mb-4">Do not cancel with your current phone provider until the transfer is 100% complete. We will notify you when it is time.</h3>
  
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