import axios from 'axios';
// import { ROOT_URL } from '../../config.js';
const ROOT_URL = "https://redloco.ca"

//API call to retrieve a list of locations prepared for the GRID view
export function api_getPricing(address) {

  const URL = `${ROOT_URL}/api/v1/pricing/`;
  const request = axios({
    url: URL,
    method: 'get',
    params: {
      address: address
    }
  });

  // let stubbed_data = { "data": {
  //   "internet": [
  //     {
  //       "id": 9,
  //       "title": "Canfone 5",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 5,
  //       "upload_speed": 1,
  //       "price_2yr_contract": 40.0,
  //       "price_no_contract": 45.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 10,
  //       "title": "Canfone 15",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 15,
  //       "upload_speed": 2,
  //       "price_2yr_contract": 45.0,
  //       "price_no_contract": 50.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 11,
  //       "title": "Canfone 30",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 30,
  //       "upload_speed": 3,
  //       "price_2yr_contract": 50.0,
  //       "price_no_contract": 55.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 12,
  //       "title": "Canfone 60",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 60,
  //       "upload_speed": 5,
  //       "price_2yr_contract": 58.0,
  //       "price_no_contract": 63.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 13,
  //       "title": "Canfone 100",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 100,
  //       "upload_speed": 10,
  //       "price_2yr_contract": 65.0,
  //       "price_no_contract": 70.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 14,
  //       "title": "Canfone 200",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 200,
  //       "upload_speed": 20,
  //       "price_2yr_contract": 85.0,
  //       "price_no_contract": 90.0,
  //       "region": 2
  //     },
  //     {
  //       "id": 15,
  //       "title": "Canfone 1000",
  //       "description": "Ideal for email, basic web browsing, phone service",
  //       "download_speed": 1000,
  //       "upload_speed": 50,
  //       "price_2yr_contract": null,
  //       "price_no_contract": null,
  //       "region": 2
  //     }
  //   ],
  //   "hardware": [
  //     {
  //       "id": 6,
  //       "name": "FireStick",
  //       "description": "Buy a Firestick for $50 which comes preconfigured and activated for Canfone TV.",
  //       "rating": null,
  //       "initial_cost": 50.0,
  //       "monthly_fee": 0.0,
  //       "image_src": "firestick-8273g.png",
  //       "priority": 1,
  //       "category": "TV",
  //       "region": 3
  //     },
  //     {
  //       "id": 14,
  //       "name": "Modem / Wireless Router",
  //       "description": "Buy Modem and FREE WiFi Router",
  //       "rating": 200,
  //       "initial_cost": 99.0,
  //       "monthly_fee": 0.0,
  //       "image_src": "tc4300_hapAC.jpg",
  //       "priority": 2,
  //       "category": "IN",
  //       "region": 3
  //     },
  //     {
  //       "id": 13,
  //       "name": "Modem / Wireless Router",
  //       "description": "Rent to own Modem and FREE WiFi Router",
  //       "rating": 200,
  //       "initial_cost": 0.0,
  //       "monthly_fee": 10.0,
  //       "image_src": "tc4300_hapAC.jpg",
  //       "priority": 2,
  //       "category": "IN",
  //       "region": 3
  //     },
  //     {
  //       "id": 12,
  //       "name": "Modem / Wireless Router",
  //       "description": "Buy Modem and FREE WiFi Router",
  //       "rating": 60,
  //       "initial_cost": 99.0,
  //       "monthly_fee": 0.0,
  //       "image_src": "6b6141_hapAC.jpg",
  //       "priority": 2,
  //       "category": "IN",
  //       "region": 3
  //     },
  //     {
  //       "id": 11,
  //       "name": "Modem / Wireless Router",
  //       "description": "Rent to own Modem and FREE WiFi Router",
  //       "rating": 60,
  //       "initial_cost": 0.0,
  //       "monthly_fee": 10.0,
  //       "image_src": "6b6141_hapAC.jpg",
  //       "priority": 2,
  //       "category": "IN",
  //       "region": 3
  //     },
  //     {
  //       "id": 8,
  //       "name": "Android",
  //       "description": "Buy an Android for $100 which comes preconfigured and activated for Canfone TV.",
  //       "rating": null,
  //       "initial_cost": 100.0,
  //       "monthly_fee": 0.0,
  //       "image_src": "android-7443fa.png",
  //       "priority": 3,
  //       "category": "TV",
  //       "region": 3
  //     },
  //     {
  //       "id": 5,
  //       "name": "Grandstream GS-HT801",
  //       "description": "Grandstream GS-HT801 ATA",
  //       "rating": null,
  //       "initial_cost": 0.0,
  //       "monthly_fee": 0.0,
  //       "image_src": "GS-HT801_8723gb.png",
  //       "priority": 999,
  //       "category": "PH",
  //       "region": 3
  //     }
  //   ],
  //   "phone": [
  //     {
  //       "id": 1,
  //       "title": "Canada",
  //       "description": "Unlimited calling within Canada",
  //       "price": 10.0,
  //       "region": 3
  //     },
  //     {
  //       "id": 2,
  //       "title": "Canada & USA",
  //       "description": "Unlimited calling within Canada and the USA",
  //       "price": 20.0,
  //       "region": 3
  //     },
  //     {
  //       "id": 3,
  //       "title": "The World",
  //       "description": "Unlimited worldwide calling",
  //       "price": 30.0,
  //       "region": 3
  //     }
  //   ],
  //   "tv": [
  //     {
  //       "id": 1,
  //       "title": "Canfone TV Basic",
  //       "description": "Get started with Canfone TV Basic. 57 channels of prime television from your community and around the world. Includes CBC, CTV, and Global plus many more.",
  //       "price": 35.0,
  //       "region": 3
  //     }
  //   ]
  // }}
  
  // return stubbed_data;
  return request;
}

//API call to retrieve a list of locations prepared for the GRID view
export function api_getPromo(code) {

  const URL = `${ROOT_URL}/api/v1/promo/${code}`;
  const request = axios({
    url: URL,
    method: 'get'
  });

  return request;
}
