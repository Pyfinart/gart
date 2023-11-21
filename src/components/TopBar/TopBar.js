import React, {useContext, useEffect, useState} from "react"
import "./TopBar.css"
import {NFTMarketplaceProvider, NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext"

export function TopBarUntext(){

  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // 在这里可以对搜索内容进行进一步处理，如验证、格式化等
    // 处理完毕后，进行相应的搜索操作，如向后端发送请求获取搜索结果数据

    // 重定向到搜索结果页面，并将搜索内容作为查询参数传递
    window.location.href = '/search?query=' + encodeURIComponent(query);
  };

  const {connectWallet} = useContext(NFTMarketplaceContext);
  return(
    
    <div style={{top:0, width:"100%", height:"100px",zIndex:2,position:"fixed"}}>
    <div className="topbar gen-art-card">
    {console.log("connectWallet",connectWallet)}
      <img className="logo vertically-center" src="../logo.png"/>
      <p className="gart vertically-center">GART</p>
      <div className="search vertically-center">
        <div className="icon">
          <img src="../7.svg"/>
        </div>
        <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className="search-frame"
      />
      {/* <button className="search-text" onClick={handleSearch}>Search</button> */}
      </div>
      <div className="vertically-center notification">
        <div>
          <img src="../Group 9157.svg"/>
        </div>
      </div>
      <button onClick={() =>(connectWallet())}>
        <div className="vertically-center connect-wallet">
            <p className="connect-wallet-text">Connect Wallet</p>
        </div>
      </button>
    </div>
  </div>
  )
}

export function TopBar(){
  

  return(
    <NFTMarketplaceProvider>
      <TopBarUntext></TopBarUntext>
    </NFTMarketplaceProvider>
  )

}

export function TopBarFixed(){

  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // 在这里可以对搜索内容进行进一步处理，如验证、格式化等
    // 处理完毕后，进行相应的搜索操作，如向后端发送请求获取搜索结果数据

    // 重定向到搜索结果页面，并将搜索内容作为查询参数传递
    window.location.href = '/search?query=' + encodeURIComponent(query);
  };

  return(
    
    <div style={{top:0, width:"100%", height:"100px",zIndex:2,position:"absolute"}}>
    <div className="topbar gen-art-card">
      <img className="logo vertically-center" src="../logo.png"/>
      <p className="gart vertically-center">GART</p>
      <div className="search vertically-center">
        <div className="icon">
          <img src="../7.svg"/>
        </div>
        <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className="search-frame"
      />
      {/* <button className="search-text" onClick={handleSearch}>Search</button> */}
      </div>
      <div className="vertically-center notification">
        <div>
          <img src="../Group 9157.svg"/>
        </div>
      </div>
      <button>
        <div className="vertically-center connect-wallet">
            <p className="connect-wallet-text">Connect Wallet</p>
        </div>
      </button>
    </div>
  </div>
  )
}