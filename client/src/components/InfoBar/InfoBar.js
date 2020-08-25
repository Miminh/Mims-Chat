import React from "react";
import { Link } from "react-router-dom";

import onlineIcon from "../../assets/icons/onlineIcon.png";
import closeIcon from "../../assets/icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = (props) => {
  return (
    <div className="infobar-container">
      <div className="infobar-container-left">
        <img src={onlineIcon} alt="online" className="online" />
        <h3 className="infobar-name">{props.name}</h3>
      </div>
      <div className="infobar-container-right">
        <Link to="/">
          <img src={closeIcon} alt="close" className="close" />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
