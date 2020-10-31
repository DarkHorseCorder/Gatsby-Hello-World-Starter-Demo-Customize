import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
import { GATSBY_IMGS } from "utils/imgloader"

const useStyles = makeStyles(theme => ({
  select_btn: {
    paddingLeft: 40,
    paddingRight: 40
  }
}));

function Item({item, selectHardware, selected_hardware_id}) {
  const {id, name, description, image_src, initial_cost} = item
  // const {category, monthly_fee, region_id, rating } = item
  const classes = useStyles();

  return (
    <div className="md:flex md:items-center px-4 py-2 my-2 border border-gray-400">
      {(image_src.length > 0) ?
        <div className="md:w-1/3">
          <img src={GATSBY_IMGS[`img/${image_src}`]} className="mx-auto md:mx-0" alt=""/>
        </div>
        :
        <div className="md:w-1/3">
          <h3 className="text-sm grey-450">No Image</h3>
        </div>
      }
      <div className="md:flex-1 py-2 px-2 md:px-3">
        <h2 className="text-xl font-semibold md:pl-2">{name}</h2>
        <div className="hardware-option-description md:flex-1 pt-0 md:px-2">
          <ReactMarkdown source={description} />
        </div>

        <div className="md:flex md:items-center pt-0 md:pt-3">
          {(initial_cost === 0) ?
            <Fragment>
              <h1 className="md:flex-1 text-3xl text-canfone-teal font-semibold text-center md:text-right pr-3">$0<span className="text-sm grey-450 pl-3">Included</span></h1>
              <div className="text-center mt-4 md:mt-0 md:text-left md:pl-5">
                <Button 
                  variant="contained"
                  color="primary" 
                  size="small" 
                  className={classes.select_btn}
                  >
                  Selected
                </Button>
              </div>
            </Fragment>
            :
            <Fragment>
              <h1 className="md:flex-1 text-3xl text-canfone-teal font-semibold text-center md:text-right pr-3">${initial_cost}<span className="text-sm grey-450 pl-3">One-time Fee</span></h1>
              <div className="text-center mt-4 md:mt-0 md:text-left md:pl-5">
                <Button 
                  variant={(id === selected_hardware_id) ? 
                    "contained"
                  :
                    "outlined"
                  }
                  color="primary" 
                  size="small" 
                  className={classes.select_btn}
                  value={id}
                  onClick={selectHardware}>
                  {(id === selected_hardware_id) ? 
                      "Selected"
                    :
                      "Select"
                  }
                </Button>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </div>
  );
}

export default Item;