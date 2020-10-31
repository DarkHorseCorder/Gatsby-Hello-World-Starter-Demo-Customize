import React, { useEffect} from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { DatePicker } from "@material-ui/pickers";
// import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  alert_root: {
    width: '100%',
    borderRadius: 0,
    '& > *': {
      borderRadius: 0,
    },
  },  
  formControl: {
    width: '100%',
  },
  formText: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
}));

function InstallationDates({lang}) {

  useEffect(() => {
    // Set selected date option from localStorage if available, default = ASAP
    //setInstallationDateOption(localStorage.getItem('selected_installation_option') || 'ASAP')
    // Set default installation dates if they are not yet set
    if (localStorage.getItem('selected_installation_date') == null) {
      localStorage.setItem('selected_installation_date', 'ASAP')
      localStorage.setItem('selected_installation_time', 'Any Time')
    }
  }, []);

  const classes = useStyles();

  const earliest_install_date = moment().add(7, 'days').format('YYYY-MM-DD');

  const [asap_time, setASAPTime] = React.useState('Any Time');
  const handleASAPTimeChange = (event) => {
    setASAPTime(event.target.value);
    if (selected_installation_date_option === 'ASAP') {
      localStorage.setItem('selected_installation_time', event.target.value)
    }
  };

  const [scheduled_date, setScheduledDate] = React.useState(earliest_install_date);
  const handleScheduledDateChange = (date) => {
    let moment_obj = moment(date);
    setScheduledDate(moment_obj.format('YYYY-MM-DD'));
    localStorage.setItem('selected_installation_date', moment_obj.format('YYYY-MM-DD'))
  };

  const [scheduled_time, setScheduledTime] = React.useState('Any Time');
  const handleScheduledTimeChange = (event) => {
    setScheduledTime(event.target.value);
    if (selected_installation_date_option === 'SELECTED_DATE') {
      localStorage.setItem('selected_installation_time', event.target.value)
    }
  };

  const [selected_installation_date_option, setInstallationDateOption] = React.useState('ASAP');
  const handleInstallationDateOptionChange = (event) => {
    setInstallationDateOption(event.target.value);
    if (event.target.value === 'ASAP') {
      localStorage.setItem('selected_installation_option', 'ASAP')
      localStorage.setItem('selected_installation_date', 'ASAP')
      localStorage.setItem('selected_installation_time', asap_time)
      // Update parent component
      // Parent component reads from localStorage so results can be gathered then
    } else {
      localStorage.setItem('selected_installation_option', 'SELECTED_DATE')
      localStorage.setItem('selected_installation_date', scheduled_date)
      localStorage.setItem('selected_installation_time', scheduled_time)
      // Update parent component
      // Parent component reads from localStorage so results can be gathered then
    }
  };

  return (
    <div className="mb-6 mx-6 pb-6 border border-gray-600 shadow-md">
      <div className="px-6">
        <h2 className="text-xl md:text-2xl font-semibold pt-2 mb-6 grey-750">
          { (lang === "en") ? "Select an Installation Date" : "Sélectionnez une date d'installation"}
        </h2>

        <div className="mt-6">
        <div className="block md:flex mr-2 mb-4">
            <div className="pt-2">
              <Radio
                checked={selected_installation_date_option === 'ASAP'}
                onChange={handleInstallationDateOptionChange}
                value="ASAP"
                name="radio-button-asap"
                inputProps={{ 'aria-label': 'ASAP' }}
              />
            </div>
            <div className="p-1 md:flex-1">
              <form className={classes.formText} noValidate autoComplete="off">
                <TextField 
                  id="asap-date-preference" 
                  disabled={(selected_installation_date_option === 'SELECTED_DATE') ? true : false}
                  color="secondary"
                  label="ASAP" 
                  variant="outlined" 
                  defaultValue={ (lang === "en") ? "ASAP (As Soon As Possible)" : "Dès que possible"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </form>
            </div>
            <div className="p-1 md:flex-1">
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  id="asap-time-preference"
                  disabled={(selected_installation_date_option === 'SELECTED_DATE') ? true : false}
                  color="secondary"
                  value={asap_time}
                  onChange={(e) => {
                    handleASAPTimeChange(e);
                  }}
                >
                  <MenuItem value={'Any Time'}>{(lang === "en") ? "Any Time" : "A tout moment"}</MenuItem>
                  <MenuItem value={'Morning (8AM - 12PM)'}>{(lang === "en") ? "Morning (8AM - 12PM)" : "Matin (0800 - 1200)"}</MenuItem>
                  <MenuItem value={'Afternoon (12PM - 5PM)'}>{(lang === "en") ? "Afternoon (12PM - 5PM)" : "Après-midi (1200 - 1700)"}</MenuItem>
                  <MenuItem value={'Evening (5PM - 9PM)'}>{(lang === "en") ? "Evening (5PM - 9PM)":"Evening (1700 - 2100)"}</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="block md:flex mr-2">
            <div className="pt-2">
              <Radio
                checked={selected_installation_date_option === 'SELECTED_DATE'}
                onChange={handleInstallationDateOptionChange}
                value="SELECTED_DATE"
                name="radio-button-scheduled"
                inputProps={{ 'aria-label': 'Scheduled' }}
              />
            </div>
            <div className="p-1 md:flex-1">
              <FormControl className={classes.formControl}>
                <DatePicker
                  disabled={(selected_installation_date_option === 'ASAP') ? true : false}
                  color="secondary"
                  label="Select a Date"
                  inputVariant="outlined"
                  value={scheduled_date}
                  minDate={earliest_install_date}
                  onChange={(selected_date) => {
                    handleScheduledDateChange(selected_date);
                  }}
                  format="dddd MMMM D, YYYY"
                  animateYearScrolling
                />
              </FormControl>
            </div>
            <div className="p-1 md:flex-1">
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  color="secondary"
                  id="selected-time-preference"
                  disabled={(selected_installation_date_option === 'ASAP') ? true : false}
                  value={scheduled_time}
                  onChange={(e) => {
                    handleScheduledTimeChange(e);
                  }}
                >
                  <MenuItem value={'Any Time'}>{(lang === "en") ? "Any Time" : "A tout moment"}</MenuItem>
                  <MenuItem value={'Morning (8AM - 12PM)'}>{(lang === "en") ? "Morning (8AM - 12PM)" : "Matin (0800 - 1200)"}</MenuItem>
                  <MenuItem value={'Afternoon (12PM - 5PM)'}>{(lang === "en") ? "Afternoon (12PM - 5PM)" : "Après-midi (1200 - 1700)"}</MenuItem>
                  <MenuItem value={'Evening (5PM - 9PM)'}>{(lang === "en") ? "Evening (5PM - 9PM)":"Evening (1700 - 2100)"}</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="my-8 pt-4 pb-4 mx-0 px-4 border border-gray-300 bg-gray-200">
          <h2 className="text-xl grey-600 font-semibold pb-3">Please Note:</h2>
          {(lang === "en") ? <p className="text-sm grey-600">
            It will take approximately 7 days for your Internet service to be installed. Choosing ASAP could potentially provide 
            you with a short notice booking in the event of client rescheduling. The earliest available date has been 
            automatically selected, however, you may change the date and time to those which suit you best. Someone of legal 
            age will need to be present at your home for technician to complete the installation.
          </p> : <p className="text-sm grey-600">
            Il faut compter environ 7 jours pour l'installation de votre service Internet. Choisir le plus rapidement possible pourrait vous permettre de 
            vous avec une réservation à court terme en cas de changement de client. La première date disponible a été automatiquement sélectionnés, mais 
            vous pouvez changer la date et l'heure pour celles qui vous conviennent le mieux. Une personne de confiance L'âge devra être présent à votre 
            domicile pour que le technicien puisse procéder à l'installation.
          </p>}
        </div>
      </div>
    </div>
  );
}

export default InstallationDates;
