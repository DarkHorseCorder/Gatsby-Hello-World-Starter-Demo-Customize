import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  next_btn: {
    width: '100%',
    paddingRight: 15,
    justifyContent: 'right',
    fontSize: 20
  }
}));

function OrderSheet({order_data, nextStep, removePhonePackage, removeTVPackage, lang}) {
  let link_text = 'Next';
  let pathArray = (typeof window !== 'undefined') ? window.location.href.split("/") : null;

  let current_path = pathArray ? (pathArray[pathArray.length-1] === "" ? pathArray[pathArray.length-2] : pathArray[pathArray.length-1]) : "/"
  if (current_path === 'service_details') {
    link_text = 'Review & Pay'
  };
  const classes = useStyles();

  const calculateTax = (amt) => {
    if (order_data.province === 'NL') {
      return(amt*0.15)
    } else if (order_data.province === 'QC') {
      return(amt*0.14975)
    } else if (order_data.province === 'NS') {
      return(amt*0.13)
    } else if (order_data.province === 'NU') {
      return(amt*0.05)
    } else if (order_data.province === 'PE') {
      return(amt*0.15)
    } else if (order_data.province === 'NB') {
      return(amt*0.15)
    } else if (order_data.province === 'ON') {
      return(amt*0.13)
    } else if (order_data.province === 'MB') {
      return(amt*0.12)
    } else if (order_data.province === 'SK') {
      return(amt*0.11)
    } else if (order_data.province === 'NT') {
      return(amt*0.05)
    } else if (order_data.province === 'AB') {
      return(amt*0.05)
    } else if (order_data.province === 'BC') {
      return(amt*0.12)
    } else if (order_data.province === 'YT') {
      return(amt*0.05)
    } else {
      return (amt*0.05)
    }
  }

  let total_one_time_costs = order_data.internet_hardware_one_time_fee + order_data.tv_hardware_one_time_fee + 
    order_data.phone_hardware_one_time_fee;
  let total_monthly_fees = order_data.internet_hardware_monthly_fee + order_data.internet_package_fee +
    order_data.tv_package_fee + order_data.phone_package_fee;

  let promo_code_message = '';
  let promo_code_value = 0;
  if (order_data.promo_code_type === 'Fixed Dollar Amount - onetime') {
    promo_code_message = 'Save $' + order_data.promo_code_value;
    promo_code_value = parseFloat(order_data.promo_code_value);
    total_one_time_costs -= promo_code_value;
  } else if (order_data.promo_code_type === 'Fixed Dollar Amount - monthly') {
    promo_code_message = 'Save $' + order_data.promo_code_value + ' per Month';
    promo_code_value = parseFloat(order_data.promo_code_value);
    total_monthly_fees -= promo_code_value;
  } else {
    promo_code_message = order_data.promo_code_value;
  }

  return (
    <div className="mx-auto lg:mx-0 max-w-xs rounded-lg bg-white overflow-hidden border border-gray-600 order-sheet mb-6">
      <div className="flex px-4 bg-canfone-teal">
        <div className=" flex-1 text-white text-2xl py-2 uppercase">{(lang === "en") ? "Your Order" : "Votre commande"}</div>
        <div className={clsx("mt-4", (current_path === 'order_review') && 'hidden')} role="button" onKeyDown={() => console.log("Key pressed!")} onClick={nextStep}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-2xl text-white cursor-pointer" />
        </div>
      </div>

      <div className="p-4">
        <div className={clsx("border-b border-gray-400", (current_path === 'internet') && 'pl-3')}>
          <div className="my-1 px-3 border-l-4 border-teal-400">
            <div className="flex items-end">
              <div className="flex-1">
                <a href="../internet" className="text-sm grey-600 font-semibold uppercase hover:underline">{(lang === "en") ? "Internet Package" : "Paquet Internet"}</a>
              </div>
              <a href="../internet" className="text-sm text-canfone-teal underline text-right pt-1">{(lang === "en") ? "Modify" : "Modifier"}</a>
            </div>
            {(order_data.internet_package_name.length > 0) ?
              <div>
                <p className="text-xl text-canfone-teal font-semibold py-1">
                  {order_data.internet_package_name}
                </p>
                <div className="flex">
                  <h3 className="flex-1 grey-600 text-sm">
                    {(lang === "en") ? 'Monthly Fee:' : "Frais mensuels:"}
                  </h3>
                  <div className="grey-600 text-sm">
                    {`$${order_data.internet_package_fee.toFixed(2)}`}
                  </div>
                </div>
                {(order_data.service_contract === '2YR') ?
                  <p className="grey-600 text-xs">{(lang === "en") ? "2-YR Contract" : "Contrat de 2 ans"}</p>
                :
                  <p className="grey-600 text-xs">{(lang === "en") ? "No Contract" : "Pas de contrat"}</p>
                }
              </div>
              :
              <h3 className="text-sm grey-400">{(lang === "en") ? "None Selected" : "Aucun sélectionné"}</h3>
            }
          </div>
        </div>

        <div className={clsx("border-b border-gray-400", (current_path === 'tv') && 'pl-3')}>
          <div className="my-1 px-3 py-1 border-l-4 border-teal-400">
            <div className="flex items-end">
              <div className="flex-1">
                <a href="../tv" className="text-sm grey-600 font-semibold uppercase hover:underline">{(lang === "en") ? "TV Package" : "Paquet TV"}</a>
              </div>
              { (order_data.tv_package_id > 0) ?
                <button 
                  className="text-sm text-canfone-teal underline text-right" 
                  onClick={removeTVPackage}>
                  {(lang === "en") ? "Remove" : "Supprimer"}
                </button>
                :
                <button 
                  className={clsx("text-sm text-canfone-teal underline text-right", (current_path === 'tv') && 'invisible')}
                  onClick={() => {window.location = "../tv"}}>
                  {(lang === "en") ? "Add" : "Ajouter"}
                </button>
              }
            </div>
            {(order_data.tv_package_id > 0) ?
              <Fragment>
                <p className="text-xl text-canfone-teal font-semibold py-1">
                  {order_data.tv_package_name}
                </p>
                <div className="flex">
                  <h3 className="flex-1 grey-600 text-sm">
                    {(lang === "en") ? 'Monthly Fee:' : "Frais mensuels:"}
                  </h3>
                  <p className="grey-600 text-sm">
                    {`$${order_data.tv_package_fee.toFixed(2)}`}
                  </p>
                </div>
              </Fragment>
              :
              <h3 className="text-sm grey-400">{(lang === "en") ? "None Selected" : "Aucun sélectionné"}</h3>
            }
          </div>
        </div>

        <div className={clsx("border-b border-gray-400", (current_path === 'phone') && 'pl-3')}>
          <div className="my-1 px-3 py-1 border-l-4 border-teal-400">
            <div className="flex items-end">
              <div className="flex-1">
                <a href="../phone" className="text-sm grey-600 font-semibold uppercase hover:underline">{(lang === "en") ? "Phone Package" : "Paquet téléphonique"}</a>
              </div>
              { (order_data.phone_package_id > 0) ?
                <button 
                  className="text-sm text-canfone-teal underline text-right" 
                  onClick={removePhonePackage}>
                  {(lang === "en") ? "Remove" : "Supprimer"}
                </button>
                :
                <button 
                  className={clsx("text-sm text-canfone-teal underline text-right", (current_path === 'phone') && 'invisible')}
                  onClick={() => {window.location = "../phone"}}>
                  {(lang === "en") ? "Add" : "Ajouter"}
                </button>
              }
            </div>
            {(order_data.phone_package_name.length > 0) ?
              <Fragment>
                <p className="text-xl text-canfone-teal font-semibold py-1">
                  {order_data.phone_package_name}
                </p>
                <div className="flex">
                  <h3 className="flex-1 grey-600 text-sm">
                    {(lang === "en") ? 'Monthly Fee:' : "Frais mensuels:"}
                  </h3>
                  <p className="grey-600 text-sm">
                    {`$${order_data.phone_package_fee.toFixed(2)}`}
                  </p>
                </div>
              </Fragment>
              :
              <h3 className="text-sm grey-400">{(lang === "en") ? "None Selected" : "Aucun sélectionné"}</h3>
            }
          </div>
        </div>

        <div className={clsx("border-b border-gray-400", (current_path === 'hardware') && 'pl-3')}>
          <div className="my-1 px-3 py-1 border-l-4 border-teal-400">
            <div className="flex pb-2">
              <div className="flex-1">
                <a href="../hardware" className="text-sm grey-600 font-semibold uppercase hover:underline">Hardware</a>
              </div>
              <div>
                <a href="../hardware" className="text-sm text-canfone-teal underline text-right pt-1">{(lang === "en") ? "Modify" : "Modifier"}</a>
              </div>
            </div>
            <Fragment>
              {order_data.internet_hardware_description &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {order_data.internet_hardware_description}
                </p>
              }
              {order_data.tv_hardware_name ?
                  <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px" />
                    {order_data.tv_hardware_name}
                  </p>
                :
                  null
              }
              {order_data.phone_hardware_name &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {order_data.phone_hardware_name}
                </p>
              }
              {(order_data.internet_hardware_description.length === 0 && order_data.tv_hardware_name.length === 0 && order_data.phone_hardware_name.length === 0) &&
                <p className="text-sm grey-400">
                  {(lang === "en") ? "None Selected" : "Aucun sélectionné"}
                </p>
              }
              {(order_data.internet_hardware_description.length > 0 || order_data.tv_hardware_name.length > 0 || order_data.phone_hardware_name.length > 0) &&
                <Fragment>
                  <div className="flex pt-3">
                    <h3 className="flex-1 grey-600 text-sm">
                      {(lang === "en") ? "One-Time Cost:" : "Coût unique:"}
                    </h3>
                    <p className="grey-600 text-sm">
                      { (total_one_time_costs) ?
                          `$${total_one_time_costs.toFixed(2)}`
                        :
                          '$0.00'
                      }
                    </p>
                  </div>
                  <div className="flex">
                    <h3 className="flex-1 grey-600 text-sm">
                      {(lang === "en") ? 'Monthly Fee:' : "Frais mensuels:"}
                    </h3>
                    <p className="grey-600 text-sm">
                      { (total_monthly_fees) ?
                          `$${order_data.internet_hardware_monthly_fee.toFixed(2)}`
                        :
                          '$0.00'
                      }
                    </p>
                  </div>
                </Fragment>
              }
            </Fragment>
          </div>
        </div>

        <div className={clsx("border-b border-gray-400", (current_path === 'service_details') && 'pl-3')}>
          <div className="my-1 px-2 py-1 border-l-4 border-teal-400">
            <div className="flex pb-2">
              <div className="flex-1">
                <a href="../service_details" className="text-sm grey-600 font-semibold uppercase hover:underline">{(lang === "en") ? "Service Details" : "Détails des services"}</a>
              </div>
              <div>
                <a href="../service_details" className="text-sm text-canfone-teal underline text-right pt-1">{(lang === "en") ? "Modify" : "Modifier"}</a>
              </div>
            </div>
            <Fragment>
              {(order_data.service_address_confirmed === 'YES') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "Address Confirmed" : "Adresse confirmée"}
                </p>
              }
              {(order_data.has_active_service === 'YES') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "Existing Service" : "Service existant"}
                </p>
              }
              {(order_data.has_active_service === 'NO') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "New Service" : "Nouveu service"}
                </p>
              }
              {(order_data.phone_port === 'NO') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "New Phone Number" : "Nouveau numéro"}
                </p>
              }
              {(order_data.phone_port === 'YES') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "Keep Existing Phone Number" : "Conserver le numéro"}
                </p>
              }
              {(order_data.installation_dates_accepted === 'YES') &&
                <p className="text-xs grey-500">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-canfone-teal px-1" />
                  {(lang === "en") ? "Installation Dates Selected" : "Dates d'installation choisies"}
                </p>
              }
              {(!order_data.service_address_confirmed && (order_data.has_active_service === null) && (!order_data.installation_dates_accepted)) &&
                <p className="text-sm grey-400">
                  {(lang === "en") ? "Not Completed" : "Non terminé"}
                </p>
              }
            </Fragment>
          </div>
        </div>

        {(order_data.promo_code_name !== '') &&
          <div className="border-2 border-red-500 mt-2 p-2 text-center">
            <h3 className="flex-1 text-base font-semibold text-canfone-red">Promo {order_data.promo_code_name} Applied</h3>
            <h3 className="flex-1 text-sm text-canfone-red">{promo_code_message}</h3>
          </div>
        }

        <div className="inline-flex pt-3 pb-0 px-3 w-full">
          <h2 className="flex-1 text-sm grey-800">{(lang === "en") ? 'Monthly Fee:' : "Frais mensuels:"}</h2>
          <h2 className="text-sm text-right grey-600">${total_monthly_fees.toFixed(2)}</h2>
        </div>
        <div className="inline-flex pb-0 px-3 w-full">
          <h2 className="flex-1 text-sm grey-800">{(lang === "en") ? "One-Time Cost:" : "Coût unique:"}</h2>
          <h2 className="text-sm text-right grey-600">${total_one_time_costs.toFixed(2)}</h2>
        </div>
        <div className="inline-flex pb-3 px-3 w-full">
          <h2 className="flex-1 text-sm grey-800">{(lang === "en") ? "Taxes:" : "Tax:"}</h2>
            <h2 className="text-sm text-right grey-600">${calculateTax(total_monthly_fees + total_one_time_costs).toFixed(2)}</h2>
        </div>
        <div className="inline-flex pb-2 px-3 w-full">
          <h2 className="flex-1 text-xl font-semibold grey-800">{(lang === "en") ? "Today's Total:" : "Le total:"}</h2>
          <h2 className="text-xl text-right text-canfone-teal font-semibold">${(total_monthly_fees + total_one_time_costs + calculateTax(total_monthly_fees + total_one_time_costs)).toFixed(2)}</h2>
        </div>
      </div>

      <div className={clsx("mt-2 mx-4 mb-4", (current_path === 'order_review') && 'hidden')}>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          className={classes.next_btn}
          onClick={nextStep}>
          {link_text} <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-3 text-2xl" />
        </Button>
      </div>
    </div>
  );
}

export default OrderSheet;