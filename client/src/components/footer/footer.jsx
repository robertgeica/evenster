import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="first-row">
        <div className="social links">
            <h5>Retele Sociale</h5>
          <a href="">Facebook</a>
          <a href="">Instagram</a>
          <a href="">Twitter</a>
        </div>

        <div className="adress">
          <h5>Adresa</h5>
          <h6>Eventster SRL</h6>
          <h6>Loc. Craiova, str. Peles curcanul Nr.3 Bl.B26 Ap.2</h6>
          <h6>Telefon 0736398895</h6>
        </div>

      </div>

      <div className="secound-row">
        <h5>Eventster</h5>
      </div>
    </div>
  );
};

export default Footer;
