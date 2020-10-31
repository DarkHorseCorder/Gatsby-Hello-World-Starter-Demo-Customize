import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import clsx from 'clsx';
import luhn from 'fast-luhn';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { GATSBY_IMGS } from "utils/imgloader"

const useStyles = makeStyles((theme) => ({
  promo_input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
  payment_input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  special_instructions: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  contact_info: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  date_and_cvc: {
    '& > *': {
      margin: theme.spacing(1),
      width: 100
    },
  },
}));

function OrderReview({ order_data, checkPromoCode, setDefaultInternetHardware, lang }) {

  useEffect(() => {
    // If the modem selection was bypassed force a default selection
    if (order_data.internet_hardware_id === 0) {
      console.log("NO MODEM SELECTED");
      setDefaultInternetHardware();
    }

    const shop_component = document.getElementById('shop_component');
    shop_component.classList.add("order-review");
    shop_component.classList.add("my-8");
  });


  const classes = useStyles();

  // const [validation_error, setValidationError] = useState(false);
  const [contact_name_validated, setContactNameValidated] = useState(true);
  const [contact_phone_validated, setContactPhoneValidated] = useState(true);
  const [contact_email_validated] = useState(true);
  const [card_number_validated, setCardNumberValidated] = useState(true);
  const [card_name_validated, setCardNameValidated] = useState(true);
  const [card_month_validated, setCardMonthValidated] = useState(true);
  const [card_year_validated, setCardYearValidated] = useState(true);
  const [card_cvc_validated, setCardCVCValidated] = useState(true);
  const [tos_validated, setTOSValidated] = useState(true);

  const [contact_name, setContactName] = React.useState('');
  const handleContactNameChange = (event) => {
    setContactName(titleCaseName(event.target.value));
    setCardName(titleCaseName(event.target.value));
    if (event.target.value > 5)
      setContactNameValidated(false)
  };

  const [contact_phone, setContactPhone] = React.useState('');
  const handleContactPhoneChange = (event) => {
    setContactPhone(event.target.value);
  };

  const [contact_email, setContactEmail] = React.useState('');
  const handleContactEmailChange = (event) => {
    setContactEmail(event.target.value);
  };

  const [card_number, setCardNumber] = useState('');
  const handleCardNumberChange = (event) => {
    event.preventDefault();
    setCardNumber(event.target.value);
  };

  const [card_name, setCardName] = useState('');
  const handleCardNameChange = (event) => {
    event.preventDefault();
    setCardName(event.target.value);
  }

  const [card_expiry_month, setCardExpiryMonth] = useState('');
  const handleCardExpiryMonthChange = (event) => {
    setCardExpiryMonth(event.target.value);
  };

  const [card_expiry_year, setCardExpiryYear] = useState('');
  const handleCardExpiryYearChange = (event) => {
    setCardExpiryYear(event.target.value);
  };

  const [card_cvc, setCardCVC] = useState('');
  const handleCardCVCChange = (event) => {
    setCardCVC(event.target.value);
  };

  const [promocode, setPromoCode] = useState('');
  const handlePromoInputChange = (event) => {
    event.preventDefault();
    setPromoCode(event.target.value);
  };

  const [special_instructions, setSpecialInstructions] = useState('');
  const handleSpecialInstructionsChange = (event) => {
    localStorage.setItem('special_instructions', event.target.value);
    setSpecialInstructions(event.target.value);
  };

  // On initial render check for existing special_instructions in LS and set accordingly
  useEffect(() => {
    let saved_special_instructions = (localStorage.getItem('special_instructions')) || '';
    if (saved_special_instructions.length > 0) {
      setSpecialInstructions(saved_special_instructions);
    } else {
      // Set intial value for localStorage > special_instructions
      localStorage.setItem('special_instructions', '');
      setSpecialInstructions('');
    }
  }, []); // Run the effect only once on mount

  const [tos_checked, setTosChecked] = React.useState(false);
  const handleTosCheckedChange = (event) => {
    setTosChecked(event.target.checked);
    if (event.target.checked) {
      setTOSValidated(true);
    }
  };

  const submitPromoCode = () => {
    setPromoCode('');
    checkPromoCode(promocode);
  }

  const titleCaseName = (input) => {
    input = input.toLowerCase().split(' ');
    let output = [];
    for (let element of input) {
      output.push(element.charAt(0).toUpperCase() + element.slice(1));
    }

    return output.join(' ')
  }

  const submitOrder = () => {
    // const URL = "http://0.0.0.0:8000/api/v1/order/";
    const URL = "https://redloco.ca/api/v1/order/";
    // const URL = `${ROOT_URL}/api/v1/promo/${code}`;
    let validates = true;

    // Validate contact name
    if (contact_name.length < 5) {
      validates = false;
      setContactNameValidated(false);
    } else {
      setContactNameValidated(true);
    }

    // Validate phone
    if (contact_phone.length < 10) {
      validates = false
      setContactPhoneValidated(false);
    } else {
      setContactPhoneValidated(true);
    }

    // Validate card details
    if (luhn(card_number)) {
      setCardNumberValidated(true);
    } else {
      validates = false;
      setCardNumberValidated(false);
    }

    if (card_name.length < 5) {
      validates = false;
      setCardNameValidated(false);
    } else {
      setCardNameValidated(true);
    }

    let current_month = parseInt(moment().format('M'));
    let current_year = parseInt(moment().format('YYYY'));
    if (card_expiry_month === '') {
      setCardMonthValidated(false);
      validates = false;
    }
    if (card_expiry_year === '') {
      setCardYearValidated(false);
      validates = false;
    }
    if (card_expiry_month.length > 0 && card_expiry_year.length > 0) {
      if (card_expiry_year <= current_year && card_expiry_month < current_month) {
        setCardMonthValidated(false);
        setCardYearValidated(false);
        validates = false;
      } else {
        setCardMonthValidated(true);
        setCardYearValidated(true);
      }
    }

    if (card_cvc.length < 3) {
      validates = false;
      setCardCVCValidated(false);
    } else {
      setCardCVCValidated(true);
    }

    // Validate TOS has been checked
    if (!tos_checked) {
      validates = false;
      setTOSValidated(false);
      // setValidationError(true);
    }

    let data = JSON.stringify({
      ...localStorage,
      contact_name: contact_name,
      contact_phone: contact_phone,
      contact_email: contact_email,
      name: card_name,
      cc_number: card_number,
      cc_expiry_year: card_expiry_year,
      cc_expiry_month: card_expiry_month,
      cc_cvc: card_cvc
    })

    //console.log('Order Data:', data)
    if (validates === true) {
      axios({
        method: 'post',
        url: URL,
        data: data
      }).then(function (response) {
        console.log(response)
        window.location = "order_confirmation"
      });
    }
  }


  return (
    <Fragment>
      <div className="w-11/12 mx-auto border border-dashed border-gray-600 pb-6">
        <h2 className="text-2xl font-semibold grey-800 text-center pt-2">{(lang === "en") ? "Your Order" : "Réviser votre commande"}</h2>
        {(lang === "fr") && <h2 className="text-base grey-700 text-center pb-3 px-4">Veuillez vérifier l'exactitude des informations relatives à votre commande</h2>}
        <div className="md:w-10/12 md:mt-3 mx-auto px-4">
          <div className="flex items-start py-2">
            <h2 className="w-4/12 text-sm font-semibold grey-800">{(lang === "en") ? "Service Address:" : "Adresse de service:"}</h2>
            <p className="w-8/12 text-sm grey-600">{order_data.service_address}</p>
          </div>

          <div className="flex items-start py-2">
            <h2 className="w-4/12 text-sm font-semibold grey-800">{(lang === "en") ? "Internet Package:" : "Paquet Internet:"}</h2>
            <div className="w-8/12">
              <p className="text-sm grey-600">{order_data.internet_package_name}</p>
              <p className="text-sm grey-600">{order_data.internet_hardware_description}</p>
              {(order_data.has_active_service === 'NO') ?
                <p className="text-sm grey-600">{(lang === "en") ? "New Service" : "Nouvelle installation de service"}</p>
                :
                <p className="text-sm grey-600">{(lang === "en") ? "Replacing an Existing Service" : "Remplacement d'un service existant"}</p>
              }
            </div>
          </div>

          {(order_data.tv_package_name.length > 0) ?
            <div className="flex items-start py-2">
              <h2 className="w-4/12 text-sm font-semibold grey-800">{(lang === "en") ? "TV Package:" : "Paquet TV:"}</h2>
              <div className="w-8/12">
                <p className="text-sm grey-600">{order_data.tv_package_name}</p>
                <p className="text-sm grey-600">{order_data.tv_hardware_name}</p>
              </div>
            </div>
            :
            null
          }

          {(order_data.phone_package_name.length > 0) ?
            <div className="flex items-start py-2">
              <h2 className="w-4/12 text-sm font-semibold grey-800">{(lang === "en") ? "Phone Package:" : "Paquet téléphonique:"}</h2>
              <div className="w-8/12">
                <p className="text-sm grey-600">{order_data.phone_package_name}</p>
                <p className="text-sm grey-600">{order_data.phone_hardware_name}</p>
              </div>
            </div>
            :
            null
          }

          <div className="flex items-start py-2">
            <h2 className="w-4/12 text-sm font-semibold grey-800">{(lang === "en") ? "Installation Date:" : "Date d'installation choisie:"}</h2>
            <div className="w-8/12">
              <p className="text-sm grey-600">{`Date: ${order_data.selected_installation_date || 'ASAP'}`}</p>
              <p className="text-sm grey-600">{`Time of Day: ${order_data.selected_installation_time || 'A tout moment'}`}</p>
            </div>
          </div>

          <div className="flex items-center w-10/12 mx-auto border-top border-gray-400 mt-6 py-4">
            <div className="flex-grow">
              <div className={classes.promo_input}>
                <TextField
                  id="outlined-basic"
                  label="Promo Code"
                  variant="outlined"
                  color="secondary"
                  value={promocode}
                  onChange={handlePromoInputChange}
                />
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={submitPromoCode}>
                {(lang === "en") ? "Apply Code" : "Appliquer le code"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-6 pb-4">
        <h2 className="text-2xl font-semibold grey-800 text-center pt-4 pb-4">{(lang === "en") ? "Special Instructions" : "Instructions spéciales"}</h2>
        <div className={classes.special_instructions}>
          <TextField
            id="special-instructions"
            multiline
            rows={4}
            color="secondary"
            placeholder={(lang === "en") ? "Let us know of anything we should be aware of as we work to fulfill your order" : "Faites-nous part de tout ce dont nous devons être conscients pendant que nous travaillons à l'exécution de votre commande"}
            value={special_instructions}
            onChange={handleSpecialInstructionsChange}
            variant="outlined"
          />
        </div>
      </div>

      <div className="w-3/5 mx-auto mt-3 pb-4">
        <h2 className="text-2xl font-semibold grey-800 text-center pt-4 pb-4">{(lang === "en") ? "Contact Information" : "Informations de contact"}</h2>
        <div id="ContactInformation" className="md:w-4/5 mx-auto">
          <div className="pt-2">
            <div className={classes.contact_info}>
              <TextField id="contact-name" color="secondary" label="Name" value={contact_name} onChange={handleContactNameChange} variant="outlined" error={(contact_name_validated) ? false : true} />
            </div>
            <div className={classes.contact_info}>
              <TextField id="contact-phone" color="secondary" label="Phone" value={contact_phone} onChange={handleContactPhoneChange} variant="outlined" error={(contact_phone_validated) ? false : true} />
            </div>
            <div className={classes.contact_info}>
              <TextField id="contact-email" color="secondary" label="Email" value={contact_email} onChange={handleContactEmailChange} variant="outlined" error={(contact_email_validated) ? false : true} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-3 pb-8">
        <h2 className="text-2xl font-semibold grey-800 text-center pt-2 pb-3">{(lang === "en") ? "Payment Details" : "Détails du paiement"}</h2>
        <div id="PaymentForm" className="md:flex md:w-4/5 mx-auto pt-3 pb-6">
          <div className="pt-4">
            <Cards
              number={card_number}
              name={card_name}
              expiry={`${card_expiry_month}/${card_expiry_year}`}
              cvc={card_cvc}
              focus={''}
              placeholders={{ name: 'YOUR NAME' }}
            />
          </div>
          <div className="px-4 pt-4 md:pl-6 md:pr-3 md:pt-0">
            <form className={classes.payment_input} noValidate autoComplete="off">
              <TextField id="card-number" color="secondary" label="Card Number" onChange={handleCardNumberChange} value={card_number} error={(card_number_validated) ? false : true} variant="outlined" />
              <TextField id="card-name" color="secondary" label="Name" onChange={handleCardNameChange} value={card_name} error={(card_name_validated) ? false : true} variant="outlined" />
            </form>
            <div className="flex">
              <FormControl variant="outlined" className={classes.date_and_cvc}>
                <InputLabel id="card-expiry-month-label" color="secondary">{(lang === "en") ? "Month" : "Mois"}</InputLabel>
                <Select
                  labelId="card-expiry-month-label"
                  id="card-expiry-month-outlined"
                  color="secondary"
                  error={(card_month_validated) ? false : true}
                  value={card_expiry_month}
                  onChange={handleCardExpiryMonthChange}
                  label="Mois"
                >
                  <MenuItem value={'01'}>01</MenuItem>
                  <MenuItem value={'02'}>02</MenuItem>
                  <MenuItem value={'03'}>03</MenuItem>
                  <MenuItem value={'04'}>04</MenuItem>
                  <MenuItem value={'05'}>05</MenuItem>
                  <MenuItem value={'06'}>06</MenuItem>
                  <MenuItem value={'07'}>07</MenuItem>
                  <MenuItem value={'08'}>08</MenuItem>
                  <MenuItem value={'09'}>09</MenuItem>
                  <MenuItem value={'10'}>10</MenuItem>
                  <MenuItem value={'11'}>11</MenuItem>
                  <MenuItem value={'12'}>12</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.date_and_cvc}>
                <InputLabel id="card-expiry-year-label" color="secondary">{(lang === "en") ? "Year" : "Annee"}</InputLabel>
                <Select
                  labelId="card-expiry-year-label"
                  id="card-expiry-year-outlined"
                  color="secondary"
                  error={(card_year_validated) ? false : true}
                  value={card_expiry_year}
                  onChange={handleCardExpiryYearChange}
                  label="Annee"
                >
                  <MenuItem value={moment().format('YYYY')}>{moment().format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 1).format('YYYY')}>{moment().add('years', 1).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 2).format('YYYY')}>{moment().add('years', 2).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 3).format('YYYY')}>{moment().add('years', 3).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 4).format('YYYY')}>{moment().add('years', 4).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 5).format('YYYY')}>{moment().add('years', 5).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 6).format('YYYY')}>{moment().add('years', 6).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 7).format('YYYY')}>{moment().add('years', 7).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 8).format('YYYY')}>{moment().add('years', 8).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 9).format('YYYY')}>{moment().add('years', 9).format('YYYY')}</MenuItem>
                  <MenuItem value={moment().add('years', 10).format('YYYY')}>{moment().add('years', 10).format('YYYY')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.date_and_cvc}>
                <TextField id="card-cvc" color="secondary" label="CVC" onChange={handleCardCVCChange} error={(card_cvc_validated) ? null : true} variant="outlined" />
              </FormControl>
            </div>
          </div>
        </div>

        <div className="text-center py-8">
          <h3 className="grey-700 text-base font-semibold uppercase">{(lang === "en") ? "All transactions are safe and secure" : "Toutes les transactions sont sûres et sécurisées"}</h3>
          <img src={GATSBY_IMGS["img/credit-cards-872Y.png"]} className="py-3 mx-auto" alt="" />
          <h4 className="grey-700 text-sm font-semibold uppercase">{(lang === "en") ? "Encrypted 128-bit SSL Payment" : "Paiement crypté par SSL 128 bits"}</h4>
        </div>

        <div className="px-16">
          <div className={clsx("flex items-center justify-center mb-8", (tos_validated) ? null : 'border border-red-600')}>
            <Checkbox
              checked={tos_checked}
              color="primary"
              onChange={handleTosCheckedChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <p className="px-1 grey-600">
              {(lang === "en") ? "I accept the Canfone" : "J'accepte le Canfone"} 
              <a href="../tos" className="text-blue-500">
                {(lang === "en") ? "Terms of Service" : "Conditions de Service"}
              </a>
              .
            </p>
          </div>
          <div className="pt-0 text-center">
            <Button variant="contained" color="primary" size="large" onClick={submitOrder}>
              <span className="text-2xl font-bold tracking-wide">{(lang === "en") ? "Pay Now" : "Payer Maintenant"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderReview;