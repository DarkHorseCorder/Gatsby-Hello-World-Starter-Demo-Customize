import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GATSBY_IMGS } from "utils/imgloader"

const useStyles = makeStyles(theme => ({
  select_btn: {
    paddingLeft: 40,
    paddingRight: 40
  }
}));

function Item({id, title, description, price, selected_tv_package_id, setTVPackage}) {
  const classes = useStyles();
  
  return (
    <div className="mb-5 mx-3">
      <div className="md:flex border border-gray-600 shadow-md">
        <div className="package-description md:flex-1 pt-0 px-4 md:pb-3">
          <div className="flex items-start pt-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-grey-800">{title} <span className="text-xs md:text-base grey-600 font-normal">powered by</span></h2>
            <div style={{height: 75}}>
              <img src={GATSBY_IMGS["img/atop.png"]} alt="" />
            </div>
          </div>
          <p className="grey-600 font-light mt-3 mb-4">{description}</p>
          <div>
            <img src={GATSBY_IMGS["img/basic-channel-logos.png"]} alt="" />
          </div>
        </div>
        <div className="md:border-l md:border-gray-400 md:pl-6 mx-4 my-3 md:pt-3">
          <div className="flex justify-center">
            <h1 className="text-4xl md:text-5xl text-canfone-red font-semibold">{`$${price}`}</h1>
            <div className="pt-3 pl-2">
              <h4 className="text-xl text-canfone-red">/month</h4>
            </div>
          </div>
          <div className="text-center pt-3 md:pt-8">
            <Button 
              variant={(id === parseInt(selected_tv_package_id)) ? 
                "contained"
              :
                "outlined"
              }
              color="primary" 
              size="large" 
              className={classes.select_btn}
              value={id}
              onClick={setTVPackage}>
              {(id === parseInt(selected_tv_package_id)) ? 
                  "Selected"
                :
                  "Select"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;