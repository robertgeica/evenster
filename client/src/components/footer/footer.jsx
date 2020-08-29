import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="first-row">
        <div className="social links">
            <h5>Retele Sociale</h5>
          <h6>Facebook</h6>
          <h6>Instagram</h6>
          <h6>Twitter</h6>
        </div>

        <div className="adress">
            <h5>Adresa</h5>
          <h6>Eventster SRL</h6>
          <h6>Loc. Craiova, str. Elena Farago</h6>
          <h6>Telefon 075342346</h6>
        </div>

      </div>

      <div className="secound-row">
        <h5>Eventster</h5>
      </div>
    </div>
  );
};

export default Footer;
