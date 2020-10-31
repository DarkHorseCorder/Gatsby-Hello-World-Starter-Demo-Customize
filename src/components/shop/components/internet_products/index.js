import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Item from './item';

const useStyles = makeStyles(theme => ({
  contract_btns: {
    '& > *': {
      marginLeft: theme.spacing(2),
    },
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Internet({location, packages, order_data, setInternetPackage, setServiceContract, lang}) {
  const classes = useStyles();
  const products = packages.map((item) =>
    <Item
      key={item.id}
      id={item.id}
      title={item.title}
      description={item.description}
      customer_type={order_data.customer_type}
      business_two_year={item.business_two_year}
      business_no_contract={item.business_no_contract}
      residential_two_year={item.residential_two_year}
      residential_no_contract={item.residential_no_contract}
      download_speed={item.download_speed}
      upload_speed={item.upload_speed}
      service_contract={order_data.service_contract}
      selected_internet_package_id={order_data.internet_package_id}
      setInternetPackage={setInternetPackage}
      lang={lang}
    />
  );

  return (
    <Fragment>
      <div className="mb-5 md:pl-6 mr-4">
        {order_data.service_contract === '2YR' &&
          <div className={`mx-4 mb-3 text-right ${classes.contract_btns}`}>
            <Button 
              variant="contained" 
              color="secondary"
              value='2YR'
              onClick={setServiceContract}>
              {(lang === "en")? "2-YR Pricing" : "Contrat de 2 ans"}
              
            </Button>
            <Button 
              variant="outlined"
              value='NONE'
              onClick={setServiceContract}>
              {(lang === "en")? "No Contract" : "Pas de contrat"}
            </Button>
          </div>
        }
        {order_data.service_contract === 'NONE' &&
          <div className={`mx-4 mb-3 text-right ${classes.contract_btns}`}>
            <Button 
              variant="outlined" 
              value='2YR'
              onClick={setServiceContract}>
              {(lang === "en")? "2-YR Pricing" : "Contrat de 2 ans"}
            </Button>
            <Button 
              variant="contained"
              color="secondary"
              value='NONE'
              onClick={setServiceContract}>
              {(lang === "en")? "No Contract" : "Pas de contrat"}
            </Button>
          </div>
        }
      </div>
      
      {products.length > 0 && 
        products
      }
    </Fragment>
  )
}

export default Internet;