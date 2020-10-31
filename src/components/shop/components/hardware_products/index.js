import React, { Fragment } from 'react';
import ModemsAndRouters from './internet/modems_and_routers';
import TVProducts from './tv/product_list';
import PhoneProducts from './phone/product_list';

function Hardware({hardware_options, order_data, selectInternetHardware, selectPhoneHardware, selectTVHardware, lang}) {

  // Hardware Options
  const internet_hardware = hardware_options.filter(item => item.category === 'IN');
  const tv_hardware = hardware_options.filter(item => item.category === 'TV');
  const phone_hardware = hardware_options.filter(item => item.category === 'PH');

  let internet_hardware_options = [];
  if (order_data.internet_package_speed <= 60) {
    internet_hardware_options = internet_hardware.filter(item => item.rating <= 60);
  } else {
    internet_hardware_options = internet_hardware.filter(item => item.rating > 60);
  }

  return (
    <Fragment>
      <ModemsAndRouters 
        lang={lang}
        hardware_options={internet_hardware_options}
        selectHardware={selectInternetHardware}
        selected_hardware_id={order_data.internet_hardware_id}
        hardware_validated={order_data.validation_pass_internet_hardware_option}
      />
      {(order_data.tv_package_id > 0) &&
        <TVProducts 
          lang={lang}
          hardware={tv_hardware}
          selectHardware={selectTVHardware}
          selected_hardware_id={order_data.tv_hardware_id}
        />
      }
      {(order_data.phone_package_id > 0) &&
        <PhoneProducts 
          lang={lang}
          hardware={phone_hardware}
          selectHardware={selectPhoneHardware}
          selected_hardware_id={order_data.phone_hardware_id}
        />
      }

    </Fragment>
  )
}

export default Hardware;