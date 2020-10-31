import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PortPhoneNumber from './port_phone_number';


const useStyles = makeStyles(theme => ({
  select_btn: {
    paddingLeft: 40,
    paddingRight: 40
  }
}));

function Item({id, title, description, price, selected_phone_package_id, setPhonePackage, order_data, updatePhonePortOption, updatePhonePortAuthorization}) {
  const classes = useStyles();
  
  return (
    <div className="mb-6 mx-3">
      <div className={
        (id === parseInt(selected_phone_package_id)) ? 
          "border border-canfone-red shadow-md"
        :
          "border border-gray-600 shadow-md"
      }>
        <div className="md:flex">
          <div className="package-description md:flex-1 pt-0 px-4 md:pb-4">
            <h2 className="text-4xl font-semibold pt-2 mb-3 text-grey-800 border-b border-gray-500">{title}</h2>
            <p className="grey-600 mb-4 text-lg font-semibold">{description}</p>
            <p className="grey-600 font-light pb-3">All our phone packages come with "same bill always" guarantee!</p>
            <ul className="list-disc ml-12 mr-6">
              <li className="text-sm grey-600">Bring your own number or get a new one</li>
              <li className="text-sm grey-600">Telephone adapter (ATA) included.</li>
              <li className="text-sm grey-600">No Hassle, No Contract</li>
            </ul>
          </div>
          <div className="text-center md:text-left md:border-l md:border-gray-400 md:pl-6 mx-4 my-3 md:pt-3">
            <div className="flex justify-center md:justify-start">
              <h1 className="text-4xl md:text-5xl text-canfone-red font-semibold">{`$${price}`}</h1>
              <div className="pt-3 pl-2">
                <h4 className="text-xl text-canfone-red">/month</h4>
              </div>
            </div>
            <div className="text-center pt-3 md:pt-8">
              <Button 
                variant={(id === parseInt(selected_phone_package_id)) ? 
                  "contained"
                :
                  "outlined"

                }
                color="primary" 
                size="large" 
                className={classes.select_btn}
                value={id}
                onClick={setPhonePackage}>
                {(id === parseInt(selected_phone_package_id)) ? 
                    "Selected"
                  :
                    "Select"
                }
              </Button>
            </div>
          </div>
        </div>
        {(id === parseInt(selected_phone_package_id)) ? 
          <div className="pt-3">
            <PortPhoneNumber 
              order_data={order_data}
              updatePhonePortOption={updatePhonePortOption}
              updatePhonePortAuthorization={updatePhonePortAuthorization}
            />
          </div>
          :
          null
        }
      </div>
    </div>
  );
}

export default Item;