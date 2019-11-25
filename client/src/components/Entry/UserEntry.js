import React, { useState } from "react";
import { connect } from "react-redux";
import { addEntry } from "../../actions/Entry";
import { Link } from "react-router-dom";
const UserEntry = ({ addEntry }) => {
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    hostName: "",
    hostEmail: "",
    hostPhone: "",
    visitorPhone: ""
  });
  const {
    visitorName,
    visitorEmail,
    hostName,
    hostEmail,
    hostPhone,
    visitorPhone
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addEntry(formData).then(() =>
      setFormData({
        visitorEmail: "",
        visitorName: "",
        visitorPhone: "",
        hostName: "",
        hostEmail: "",
        hostPhone: ""
      })
    );
  };

  return (
    <div>
      <div className="navigation animated bounceInDown">
        <div>
          <h1 className="brand">
            <span>Entry</span> Management System
          </h1>
        </div>
        <div className="navigation-button">
          <div>
            <Link to="/currentSession">
              <button>Current Session</button>
            </Link>
          </div>
          <div>
            <Link to="/endedSession">
              <button>Ended Session</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="wrapper animated bounceInLeft">
        <div className="company-info">
          <ul>
            <li>
              <i className="fa fa-road"></i> Innovaccer
            </li>
            <li>
              <i className="fa fa-phone"></i> +91 98765 4321
            </li>
            <li>
              <i className="fa fa-envelope"></i> no-reply@innovaccer.com
            </li>
          </ul>
        </div>
        <div className="contact">
          <h3>Enter visitor details</h3>
          <form onSubmit={e => onSubmit(e)}>
            <p>
              <label>Name</label>
              <input
                type="text"
                required={true}
                name="visitorName"
                value={visitorName}
                onChange={e => onChange(e)}
              />
            </p>
            <p>
              <label>Email Address</label>
              <input
                type="email"
                required={true}
                name="visitorEmail"
                value={visitorEmail}
                onChange={e => onChange(e)}
              />
            </p>
            <p>
              <label>Phone Number</label>
              <input
                type="tel"
                pattern="^\d{12}$"
                maxLength="12"
                minLength="12"
                name="visitorPhone"
                value={visitorPhone}
                onChange={e => onChange(e)}
              />
              <small>Include Country code. Example: 919834412453</small>
            </p>
            <br />
            <h3>Enter host details</h3>
            <br />
            <p>
              <label>Name</label>
              <input
                type="text"
                required={true}
                name="hostName"
                value={hostName}
                onChange={e => onChange(e)}
              />
            </p>
            <p>
              <label>Email Address</label>
              <input
                type="email"
                required={true}
                name="hostEmail"
                value={hostEmail}
                onChange={e => onChange(e)}
              />
            </p>
            <p>
              <label>Phone Number</label>
              <input
                type="tel"
                pattern="^\d{12}$"
                required={true}
                maxLength="12"
                minLength="12"
                name="hostPhone"
                value={hostPhone}
                onChange={e => onChange(e)}
              />
              <small>Include Country code. Example: 919834412453</small>
            </p>
            <p className="full">
              <input type="submit" value="Submit" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { addEntry })(UserEntry);
