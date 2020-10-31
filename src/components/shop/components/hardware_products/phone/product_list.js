import React from 'react';
import Item from './item';

function ProductList({hardware, selectHardware, selected_hardware_id, lang}) {

  const items = hardware.map((item) =>
    <Item
      lang={lang}
      key={item.id}
      item={item}
      selectHardware={selectHardware}
      selected_hardware_id={selected_hardware_id}
    />
  );

  return (
    <div className="mb-6 md:ml-6 px-4 md:px-6 md:mr-4 border border-gray-600 shadow-md">
      <h2 className="text-2xl font-semibold pt-2 mb-3 grey-750 border-b border-gray-500">Phone</h2>
      {items.length > 0 && 
        items
      }
    </div>
  )
}

export default ProductList;