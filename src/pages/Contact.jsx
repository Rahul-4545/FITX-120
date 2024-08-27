import React from 'react';
import '../Style/Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="contact-info">
        <h1>Contact Us</h1>
        <div className="contact-item">
          <h2>Office Address:</h2>
          <p>No:1/462 Udaiyaar Street,<br />Pulliyankannu,<br />Ranipet District 632404</p>
        </div>
        <div className="contact-item">
          <h2>Email:</h2>
          <p><a href="mailto:rahulkrishnamoorthy2004@gmail.com">Rahul@gmail</a></p>
        </div>
      </div>

      <div className="Footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 col-12 ft-1">
              <h3><span className="highlight">RAHUL</span>KRISHNAMOORTHY</h3>
              <p>This is a platform to transform you and make a better version of yourself.</p>
            </div>
            <div className="col-md-6 col-lg-3 col-12 ft-2">
              <h5 className="quick-links">Quick Links</h5>
              <ul>
                <li className="nav-item"><a href="loss">WEIGHT LOSS</a></li>
                <li className="nav-item"><a href="gain">WEIGHT GAIN</a></li>
                <li className="nav-item"><a href="both">BODY RECOMPOSITION</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 col-12 ft-3">
              <h5 className="contact-info-header">Contact Information</h5>
              <p><i className="fa-solid fa-phone-volume"></i> 8610350048</p>
              <p><i className="fa-solid fa-envelope"></i> rahulkrishnamoorthy2004@gmail.com</p>
              <p><i className="fa-solid fa-paper-plane"></i> Ranipet, Tamilnadu.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Last-footer">
        <p>Design By Rahul Krishnamoorthy</p>
      </div>
    </div>
  );
}

export default ContactUs;






















