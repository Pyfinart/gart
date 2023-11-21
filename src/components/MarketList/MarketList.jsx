import React, {useEffect} from "react";
import ListItem from "../MarketListItem/MarketListItem.jsx"
import SingleSelector from "../SingleSelector/SingleSelector.jsx";
import "./MarketList.css"

import {drawCardBorder1} from "../../04/script"
// function jsonRename(jsonObject, oldKey, newKey){

//     jsonObject[newKey] = jsonObject[oldKey];

//     const modifiedJson = jsonObject[newKey].stringify(jsonObject);

//     console.log("From jsonRename()", modifiedJson);

//     return modifiedJson;
// }


function jsonExtract(modifyingJson, platform){
    let modifiedJson = {};

    if (platform === "Fxhash"){
        modifiedJson.id = modifyingJson.id;
        modifiedJson.name = modifyingJson.name;
        modifiedJson.displayUri = modifyingJson.thumbnailUri;
        modifiedJson.platform = modifyingJson.platform;
        modifiedJson.artist = modifyingJson.author_name;
        //Market Price Stat
        modifiedJson.currency = "Tezos";
        modifiedJson.floor = modifyingJson.marketStats_floor;
        // modifiedJson.floorChange = modifyingJson.floorChange;
        modifiedJson.secVol = modifyingJson.marketStats_secVolumeTz;
        modifiedJson.secNum1d = modifyingJson.marketStats_secVolumeNb24;
        modifiedJson.secVol1d = modifyingJson.marketStats_secVolumeTz24;
        modifiedJson.secNum7d = modifyingJson.marketStats_secVolumeNb7d;
        modifiedJson.secVol7d = modifyingJson.marketStats_secVolumeTz7d;
    }

    if (platform === "ArtBlock"){
        modifiedJson.name = modifyingJson.name;
        modifiedJson.displayUri = modifyingJson.image_url;
        modifiedJson.platform = "Opensea";
        modifiedJson.artist = "TBC";
        //Market Price Stat
        modifiedJson.currency = "Ethereum";
        modifiedJson.floor = modifyingJson.stats.floor_price;
        // modifiedJson.floorChange = modifyingJson.floorChange;
        modifiedJson.secVol = modifyingJson.stats.total_sales;
        modifiedJson.secNum1d = modifyingJson.stats.one_day_sales;
        modifiedJson.secVol1d = modifyingJson.stats.one_day_volume;
        modifiedJson.secNum7d = modifyingJson.stats.seven_day_sales;
        modifiedJson.secVol7d = modifyingJson.stats.seven_day_volume;
    }

    return (modifiedJson);
}

function MarketList(props){
    useEffect(()=>{
        drawCardBorder1();
    }, [])
    return (
        <div className="MarketList">
            {props.data.map(item => {
                let processedJson = jsonExtract(item, props.platform);
                if(processedJson.secVol!==0||props.platform=="Opensea")
                    return (<ListItem className="MarketListItem" data={processedJson}></ListItem>);
                })}
        </div>
    )
}

export default MarketList