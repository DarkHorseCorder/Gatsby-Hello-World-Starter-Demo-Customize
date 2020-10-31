import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import { GATSBY_IMGS } from "utils/imgloader"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    borderColor: "blue"
  },
  textFieldRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

function ModemsAndRouters({hardware_options, selectHardware, selected_hardware_id, hardware_validated, lang}) {
  const classes = useStyles();
  const internet_package_speed = (typeof window !== 'undefined') ? (parseInt(localStorage.getItem('internet_package_speed')) || 0) : 0;

  // const [age, setAge] = React.useState('');
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const [has_modem, setHasModem] = React.useState((typeof window !== 'undefined') ? (localStorage.getItem('has_modem') || 'NO') : 'NO');
  const toggleHasModem = (event) => {
    if (event.target.checked) {
      setHasModem('YES');
      if (typeof window !== 'undefined')
        localStorage.setItem('has_modem', 'YES')
    } else {
      setHasModem('NO');
      if (typeof window !== 'undefined')
        localStorage.setItem('has_modem', 'NO')
    }
  };

  // const [hardware_option_id, setHardwareOption] = React.useState('');
  // const handleOptionChange = (event) => {
  //   setHardwareOption(event.target.value);
  // };

  const [modem, setModem] = React.useState('');
  const handleModemChange = (event) => {
    setModem(event.target.value);
  };

  const renderPricing = () => {
    let hardware_option = hardware_options.find(option => option.id === selected_hardware_id);
    if (hardware_option) { // undefined if hardware_option_id (modem/router option) hasn't been selected
      if (hardware_option.monthly_fee > 0) {
        return <h1 className="text-3xl text-canfone-teal font-semibold text-center md:text-right pb-2 md:pt-3">{`$${hardware_option.monthly_fee}`}<span className="text-sm grey-450 pl-2">
          {(lang === "en") ? "per month for 12 months" : "par mois pendant 12 mois"}
          
          </span>
        </h1>
      } else {
        return <h1 className="text-3xl text-canfone-teal font-semibold text-center md:text-right pb-2 md:pt-3">{`$${hardware_option.initial_cost}`}<span className="text-sm grey-450 pl-2">
          {(lang === "en") ? "One-time fee" : "Frais Uniques"}
          </span>
        </h1>
      }
    } else {
      return ( // just a empty h1 for layout purposes
        <h1 className="h-10">&nbsp;</h1>
      )
    }
  }

  return (
    <div className="mb-6 md:ml-6 px-4 md:px-6 md:mr-4 border border-gray-600 shadow-md">
      <h2 className="text-2xl font-semibold pt-2 mb-3 grey-750 border-b border-gray-500">Internet</h2>
      <div className="hidden flex items-center md:items-center my-3">
        <div>
          <Checkbox
            checked={(has_modem === 'YES' ? true : false)}
            onChange={toggleHasModem}
          />
        </div>
        <h2 className="flex-1 md:pl-2 text-sm md:text-base font-semibold">{(lang === "en") ? "I already have a modem that I will use." : "J'ai déjà un modem que je vais utiliser."}</h2>
      </div>
      {(has_modem === true) ?
        <div className="px-4 py-2 my-2 border border-gray-400">
          <h2 className="text-lg font-semibold grey-600">{(lang === "en") ? "What model of modem do you have?" : "Quel modèle de modem avez-vous ?"}</h2>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={modem}
              onChange={handleModemChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>{(lang === "en") ? "Select One" : "Sélectionnez une option"}</em>
              </MenuItem>
              <MenuItem value={'Cisco DPC3848'}>Cisco DPC3848</MenuItem>
              <MenuItem value={'Cisco DPC3848V'}>Cisco DPC3848V</MenuItem>
              <MenuItem value={'Hitron CDA3-20 4.5.0.14'}>Hitron CDA3-20 4.5.0.14</MenuItem>
              <MenuItem value={'Hitron CDA3-35 6.1.2.26'}>Hitron CDA3-35 6.1.2.26</MenuItem>
              <MenuItem value={'Hitron CGN3-RES 4.2.4.11RES'}>Hitron CGN3-RES 4.2.4.11RES</MenuItem>
              <MenuItem value={'Hitron CGNM-3550 4.5.11.8-TPIA'}>Hitron CGNM-3550 4.5.11.8-TPIA</MenuItem>
              <MenuItem value={'Motorola 6B-6141'}>Motorola 6B-6141</MenuItem>
              <MenuItem value={'SmartRG SR808ac 1.0.0.14'}>SmartRG SR808ac 1.0.0.14</MenuItem>
              <MenuItem value={'Technicolor DPC3848V 50041.1.19.0'}>Technicolor DPC3848V 50041.1.19.0</MenuItem>
              <MenuItem value={'Technicolor MediaAccess TC4300'}>Technicolor MediaAccess TC4300</MenuItem>
              <MenuItem value={'TP-Link TC7650'}>TP-Link TC7650</MenuItem>
            </Select>
          </FormControl>
          <div className="pt-2">
            <h2 className="text-lg font-semibold grey-600">{(lang === "en") ? "Modem Serial Number:" : "Numéro de série du modem:"}</h2>
            <form className={classes.textFieldRoot} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Serial Number" variant="outlined" />
            </form>
          </div>
          <div className="pt-2">
            <h2 className="text-lg font-semibold grey-600">{(lang === "en") ? "Modem MAC Address:" : "Adresse MAC du modem:"}</h2>
            <form className={classes.textFieldRoot} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="MAC Address" variant="outlined" />
            </form>
          </div>
          <div className="flex px-3 py-3">
            <h2 className="text-canfone-red text-xl pr-2"><i className="fas fa-question-circle"></i></h2>
            <p className="flex-1 text-base grey-600 pt-1">
              {(lang === "en") ? "If you need help figuring out your details call us at 1-866-857-3140!" : "Si vous avez besoin d'aide pour trouver vos coordonnées, appelez-nous au 1-866-857-3140!"}
            </p>
          </div>
        </div>
      :
        <Fragment>
          <div className="hidden md:flex items-center px-4 py-2 my-2 border border-gray-400">
            {internet_package_speed <= 60 &&
              <div className="w-1/3 mx-auto px-2 py-3">
                <img src={GATSBY_IMGS["img/6b6141_hapAC.jpg"]} alt="" />
              </div>
            }
            {internet_package_speed > 60 &&
              <div className="w-1/3 mx-auto px-2 py-3">
                <img src={GATSBY_IMGS["img/tc4300_hapAC.jpg"]} alt="" />
              </div>
            }
            <div className="flex-1 py-2 px-3">
              <h2 className="text-xl font-semibold pl-2 pb-4">{(lang === "en") ? "Modem and Wireless Router" : "Modem et routeur sans fil"}</h2>
              {(hardware_validated) ?
                null
                :
                <div className="mx-3 my-2">
                  <div className={classes.alert_root}>
                    <Alert severity="error" variant="filled">
                      <AlertTitle>Error</AlertTitle>
                      {(lang === "en") ? "You'll need to select an option here." : "Vous devez sélectionner une option ici."}
                    </Alert>
                  </div>
                </div>
              }
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="modem-selection-label" color="secondary">{(lang === "en") ? "Select" : "Sélectionnez"}</InputLabel>
                <Select
                  labelId="modem-selection-label"
                  id="modem-selection"
                  value={selected_hardware_id}
                  onChange={selectHardware}
                  label="Select"
                  color="secondary"
                >
                  <MenuItem value={0}>
                    <em>{(lang === "en") ? "Select Modem and Router" : "Sélectionner le modem et le routeur"}</em>
                  </MenuItem>
                  {hardware_options.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              {renderPricing()}
            </div>
          </div>

          <div className="md:hidden px-2 py-2 my-2 border border-gray-400">
            <h2 className="text-base font-semibold px-2">{(lang === "en") ? "Modem and Wireless Router" : "Modem et routeur sans fil"}</h2>
            <div className="pr-2 text-sm">
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  value={selected_hardware_id}
                  onChange={selectHardware}
                  className={classes.selectEmpty}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="" disabled>
                    <em>{(lang === "en") ? "Select Option" : "Choisir une option"}</em>
                  </MenuItem>
                  {hardware_options.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            {internet_package_speed <= 60 &&
              <div className="w-2/3 mx-auto pt-3">
                <img src={GATSBY_IMGS["img/6b6141_hapAC.jpg"]} alt="" />
              </div>
            }
            {internet_package_speed > 60 &&
              <div className="w-2/3 mx-auto pt-3">
                <img src={GATSBY_IMGS["img/tc4300_hapAC.jpg"]} alt="" />
              </div>
            }
            {renderPricing()}
          </div>
        </Fragment>
      }
    </div>
  );
}

export default ModemsAndRouters;