import React, { useEffect, useState } from 'react';
import MarketList from '../../components/MarketList/MarketList'
import LeftSidebar from '../../components/SideBar/SideBar';
import { TopBar } from '../../components/TopBar/TopBar';
import ListItem from '../../components/MarketListItem/MarketListItem';
import { openseafetch } from '../../queries/OpenseaQuery';
import {fx_query_actions, fx_query_generativeTokens, fx_query_user,fx_query_general} from '../../queries/strings/FxQueryStrings';
import { gentkLiveDisplayUrl } from '../../fxdisplay';
import axios from 'axios';
import variables from '../../fxhash.json';
import SingleSelector from '../../components/SingleSelector/SingleSelector';

import {drawCardBorder} from "../../04/script"
function fx_data_traverse(obj, path = '') {
  if (Array.isArray(obj))
  {
    var traverse_set = [];
    for (const key in obj){
    traverse_set[`${key}`] = fx_data_traverse(obj[key],'');
    }
    return traverse_set;
  }
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    const newPath = path ? `${path}_${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, fx_data_traverse(value, newPath));
    } else {
      result[newPath] = (value === null) ? '-' : value;
    }
    if (Array.isArray(value)) {
      result[newPath] = value.map((item, i) => {
        if (typeof item === 'object') {
          //item[`platform`] = "fxhash";
          return fx_data_traverse(item, ``);
        } else {
          return item;
        }
      });
    } 
    if (typeof key === "string" && key.match(/Uri/) !== null && value !== null)
       result[newPath] = gentkLiveDisplayUrl(value);
  }
  result[`platform`] = "Fxhash";
  return result;
}

function Market(props) {
  const [loading, setLoading] = useState(true);
  const [loadingOs, setLoadingOs] = useState(true);
  const [fx, setFx] = useState([]);
  const [opensea, setOpensea] = useState({});
  const [drawed, setDrawed] = useState(false);
  useEffect(() => {

    let query = fx_query_general;
    axios.post('https://api.fxhash.xyz/graphql',{ query
    , variables,
    }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    let fxhash_data = (response.data.data);
    let json_obj = [];
    for(let i in fxhash_data)
    {
      json_obj[`${i}`]= (fx_data_traverse(fxhash_data[i]));
    }
    setFx(json_obj);
    setLoading(false);
  })
  .catch(error => {
    console.log(error);
  });

  const options = 
  {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': '5da1e9f9b0524a3c834c143be0614642'}
  }
  
      
  fetch('https://api.opensea.io/api/v1/collections?asset_owner=0x059edd72cd353df5106d2b9cc5ab83a52287ac3a&limit=30', options)
    .then(response => response.json())
    .then(response => {setOpensea(response);setLoadingOs(false);console.log("opensea data for market page",response);})
    .catch(err => console.error(err));
  }, [])

  function drawlocal(){
    drawCardBorder();
    setDrawed(true);
  }
  return(
    <div className='background home' style={{position:"relative",background:"#FFFAED"}}>
      <div style={{width:"130px",zIndex:3,position:"absolute",}}>
        <LeftSidebar path ="/Market"></LeftSidebar>
      </div>
      <div style={{top:0, width:"100%", height:"130px",zIndex:2,position:"fixed",}}>
        <TopBar></TopBar>
      </div>
      <div className='content' style={{margin:"0 0 0 80px", position:"relative", zIndex:1}}>
        <SingleSelector/>
      {
        loading||loadingOs?<p>Loading</p>:
          <div>
            <MarketList data={fx.generativeTokens} platform="Fxhash"></MarketList>
            <MarketList data={opensea} platform="ArtBlock"></MarketList>
          </div>
      }
      {loading||loadingOs||drawed?console.log("Not Drawed"):drawlocal()}
      </div>
    </div>
  );
}

export default Market;
