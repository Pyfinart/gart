import PropTypes from "prop-types";
import React, {useEffect} from "react";
import "./MarketListItem.css";

const ListItem = (props) => {
  if (typeof props.data.name !== 'string'){
    console.log(props.data);
    return <div>{typeof props.data.name}</div>
  }
  return (
    <div className="jobs-list-web-item-v gen-art-card1">
      <div className="frame">
        <img className="art" alt="Art" src={props.data.displayUri} />
        <div className="div">
        <a href={"http://localhost:3000/Project/"+props.data.id}>
          <div className="name">{props.data.name.length<=20?props.data.name:props.data.name.slice(0,18)+"..."}</div>
        </a>
          <div className="frame-2">
            <img className="element" alt="Element" src="Vector.svg" />
            <div className="title0">{props.data.artist}</div>
            <div className="text-wrapper">{props.data.platform}</div>
          </div>
        </div>
          <div className="frame-6">
            <div className="floor">
              <img className="img" alt="Xtz ICON" src={"Path.svg"} />
              <div className="price">{props.data.floor!=='-'?(props.data.floor/1000000):0}</div>
            </div>
            <div className="subtitle-7">${props.data.floor!=='-'?0.823*props.data.floor/1000000:0}</div>
          </div>
          <div className="frame-4">
            <div className="element-h">+18,60%</div>
            <div className="frame-5">
              <img className="XTZ-ICON" alt="Xtz ICON" src={"Path.svg"} />
              <div className="subtitle-6">1,040.00</div>
            </div>
          </div>
        <div className="frame-3">
          <div className="group">
            <div className="items">{props.data.secVol/1000000}</div>
            <div className="subtitle">Transaction</div>
          </div>
          <div className="group-2">
            <div className="items-2">{props.data.secNum1d}</div>
            <div className="subtitle-2">1D Sales</div>
          </div>
          <div className="group-3">
            <div className="items-3">{props.data.secVol1d/1000000}</div>
            <div className="subtitle-3">1D Volume</div>
          </div>
          <div className="group-4">
            <div className="items-4">{props.data.secNum7d}</div>
            <div className="subtitle-4">7D Sales</div>
          </div>
          <div className="group-5">
            <div className="items-5">{props.data.secVol7d/1000000}</div>
            <div className="subtitle-5">7D Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ListItem