import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import sgMail from '@sendgrid/mail';
import axios from 'axios';

import './contact-form.scss';

const ContactForm = (selected) => {


  const [dataForm, setDataForm] = useState({}); 
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.parentNode.childNodes[0].value;
    const email = e.target.parentNode.childNodes[1].value;
    const phone = e.target.parentNode.childNodes[2].value;
    const content = e.target.parentNode.childNodes[3].value;

    const newForm = {
      name,
      email,
      phone,
      content,
      selected
    };

    setDataForm(newForm);
    // console.log(newForm);
  }

  const handleSendMail = async (e, dataForm) => {
    e.preventDefault();
    console.log('submiting', dataForm);
    try {
      console.log('try');
      await axios.post('/sendmail', dataForm);
      
      
      console.log('sending mail to', dataForm);
    } catch (error) {
      console.log('err');
      console.log(error);
    }

  }


	return(
    <div className="contact-form-container">

      <h2>Get in contact</h2>
      <form className="contact-form" onChange={handleSubmit}>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Phone" />
        <textarea placeholder="Your message" />
      
        <button onClick={ e => handleSendMail(e, dataForm)} >Send email</button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
