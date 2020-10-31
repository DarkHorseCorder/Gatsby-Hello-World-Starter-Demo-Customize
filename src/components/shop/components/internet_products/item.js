import React from 'react';
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GATSBY_IMGS } from "utils/imgloader"

const useStyles = makeStyles(theme => ({
  select_btn: {
    paddingLeft: 40,
    paddingRight: 40
  }
}));

function Item({
  id, title, download_speed, upload_speed, description, customer_type, residential_no_contract, residential_two_year, business_no_contract, business_two_year,
  service_contract, speed, selected_internet_package_id, setInternetPackage, lang
}) {
  const classes = useStyles();
  const h4_clsName = "text-base md:text-lg text-center font-semibold grey-800 pt-1"
  const h1_clsName1 = "text-4xl md:text-5xl text-canfone-red font-semibold"
  const h1_clsName2 = "text-3xl md:text-4xl text-canfone-red font-semibold text-center"

  let price_no_contract = residential_no_contract;
  let price_two_year = residential_two_year;

  if (customer_type === 'BUSINESS') {
    price_no_contract = business_no_contract;
    price_two_year = business_two_year;
  }

  return (
    <div className="mb-6 mx-3">
      {speed === 60 &&
        <h1 className="text-xl md:text-2xl text-white font-semibold bg-canfone-red pl-3 py-2 border border-gray-600 border-b-0">
          {(lang === "en") ? "Most Popular" : "Plus populaire"}
        </h1>
      }
      <div className={
        (id === parseInt(selected_internet_package_id)) ?
          "md:flex border border-canfone-red shadow-md"
          :
          "md:flex border border-gray-600 shadow-md"
      }>
        <div className="package-description md:flex-1 pt-0 px-4 md:pb-3">
          <h2 className="text-3xl md:text-4xl font-semibold pt-2 mb-3 text-grey-800 border-b border-gray-500">{title}</h2>
          <ReactMarkdown source={description} />
          <div className="flex pt-3">
            <div className="inline px-3 md:pl-4 md:pr-12">
              <img src={GATSBY_IMGS[`img/speed-${download_speed}.png`]} className="mx-auto" alt="" />
              <h4 className={h4_clsName}>{`${download_speed} Mbps`}</h4>
              <h4 className="text-sm text-center grey-600 font-light pt-0">{(lang === "en") ? "Download" : "Recevoir"}</h4>
            </div>
            <div className="inline px-3 md:pl-4 md:pr-12">
              <img src={GATSBY_IMGS["img/speed-upload.png"]} className="mx-auto" alt="" />
              <h4 className={h4_clsName}>{`${upload_speed} Mbps`}</h4>
              <h4 className="text-sm text-center grey-600 font-light pt-0">{(lang === "en") ? "Upload" : "Envoyer"}</h4>
            </div>
            <div className="inline px-3 md:pl-4 md:pr-12">
              <img src={GATSBY_IMGS["img/usage-unlimited.png"]} className="mx-auto py-2" alt="" />
              <h4 className={h4_clsName}>{(lang === "en") ? "Unlimited" : "Données"}</h4>
              <h4 className="text-sm text-center grey-600 font-light pt-0">{(lang === "en") ? "Data" : "illimitées"}</h4>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left md:border-l md:border-gray-400 md:pl-6 mx-4 my-3 md:pt-3">
          {service_contract === '2YR' &&
            ((price_two_year) ?
              <div className="flex justify-center md:justify-start">
                <h1 className={h1_clsName1}>{`$${price_two_year}`}</h1>
                <div className="pt-3 pl-2">
                  <h4 className="text-xl text-canfone-red">/{(lang === "en") ? "month" : "mois"}</h4>
                </div>
              </div>
              :
              <div>
                <h1 className={h1_clsName2}>{(lang === "en") ? "Call" : "Appel à la"}</h1>
                <h1 className="text-xl md:text-2xl text-canfone-red font-semibold text-center">{(lang === "en") ? "for Pricing" : "tarification"}</h1>
              </div>
            )
          }
          {service_contract === 'NONE' &&
            ((price_no_contract) ?
              <div className="flex">
                <h1 className={h1_clsName1}>{`$${price_no_contract}`}</h1>
                <div className="pt-3 pl-2">
                  <h4 className="text-xl text-canfone-red">/{(lang === "en") ? "month" : "mois"}</h4>
                </div>
              </div>
              :
              <div>
                <h1 className={h1_clsName2}>{(lang === "en") ? "Call" : "Appel à la"}</h1>
                <h1 className="text-xl md:text-2xl text-canfone-red font-semibold text-center">{(lang === "en") ? "for Pricing" : "tarification"}</h1>
              </div>
            )
          }

          {(service_contract === '2YR' && price_two_year) &&
            <h4 className="text-sm text-center grey-600 pt-0">{(lang === "en") ? "2-YR Contract" : "Contrat de 2 ans"}</h4>
          }
          {(service_contract === 'NONE' && price_no_contract) &&
            <h4 className="text-sm text-center grey-600 pt-0">{(lang === "en") ? "No Contract" : "Pas de contrat"}</h4>
          }
          <div className="text-center pt-3 md:pt-8">
            {((service_contract === '2YR' && price_two_year) || (service_contract === 'NONE' && price_no_contract)) ?
              <Button
                variant={(id === parseInt(selected_internet_package_id)) ?
                  "contained"
                  :
                  "outlined"
                }
                color="primary"
                size="large"
                className={classes.select_btn}
                value={id}
                onClick={setInternetPackage}>
                {(id === parseInt(selected_internet_package_id)) ?
                  (lang === "en") ? "Selected" : "Sélectionné"
                  :
                  (lang === "en") ? "Select" : "Sélectionnez"
                }
              </Button>
              :
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled
                className={classes.select_btn}>
                {(id === parseInt(selected_internet_package_id)) ?
                   (lang === "en") ? "Selected" : "Sélectionné"
                   :
                   (lang === "en") ? "Select" : "Sélectionnez"
                }
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;