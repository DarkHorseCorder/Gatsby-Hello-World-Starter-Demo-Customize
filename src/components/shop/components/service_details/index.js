import React, { Fragment } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ConfirmServiceAddress from './confirm_service_address';
import CheckForExistingService from './check_for_existing_service';
import InstallationDates from './installation_dates';


function ServiceDetails({ order_data, updateAddress, updateServiceStatus, updatePhonePortStatus, lang}) {

  return (
    <Fragment>
      <ConfirmServiceAddress 
        lang={lang}
        order_data={order_data}
        updateAddress={updateAddress}
      />
      <CheckForExistingService 
        lang={lang}
        order_data={order_data}
        updateServiceStatus={updateServiceStatus}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InstallationDates
          lang={lang}
          order_data={order_data}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  )
}

export default ServiceDetails;