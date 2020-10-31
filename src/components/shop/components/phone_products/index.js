import React, { Fragment } from 'react';
import Item from './item';

function Phone({packages, order_data, setPhonePackage, updatePhonePortOption, updatePhonePortAuthorization, lang}) {

  const products = packages.map((item) =>
    <Item
      key={item.id}
      id={item.id}
      lang={lang}
      title={item.title}
      description={item.description}
      price={item.price}
      selected_phone_package_id={order_data.phone_package_id}
      setPhonePackage={setPhonePackage}
      updatePhonePortOption={updatePhonePortOption}
      updatePhonePortAuthorization={updatePhonePortAuthorization}
      order_data={order_data}
    />
  );

  return (
    <Fragment>
      {products.length > 0 && 
        products
      }
    </Fragment>
  )
}

export default Phone;