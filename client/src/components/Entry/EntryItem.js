import React, { Fragment } from "react";
import { connect } from "react-redux";
import { endEntry } from "../../actions/Entry";

const EntryItem = ({
  endEntry,
  details: {
    _id,
    visitorName,
    visitorEmail,
    hostName,
    hostEmail,
    hostPhone,
    visitorPhone,
    visitorCheckin,
    visitorCheckout
  }
}) => {
  const onClick = id => {
    endEntry(id);
  };
  const getTime = date => {
    let getIST = new Date(date);
    return `${getIST.getHours()}:${getIST.getMinutes()}:${getIST.getSeconds()} IST`;
  };
  return (
    <div className="session-container">
      <div className="visitor-container">
        <div className="visitor-details">
          <h2>Visitor Details</h2>
          <div>
            <h4>Name</h4>
            <p>{visitorName}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{visitorEmail}</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>{visitorPhone}</p>
          </div>
        </div>
        <div className="host-details">
          <h2>Host Details</h2>
          <div>
            <h4>Name</h4>
            <p>{hostName}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{hostEmail}</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>{hostPhone}</p>
          </div>
        </div>
        <div>
          {window.location.pathname === "/endedSession" && (
            <Fragment>
              <div className="visit-timing">
                <h4>
                  <u>Visitor CheckedIn time</u>
                </h4>
                <p>{getTime(visitorCheckin)}</p>
              </div>
              <div className="visit-timing">
                <h4>
                  <u>Visitor CheckOut time</u>
                </h4>
                <p>{getTime(visitorCheckout)}</p>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {visitorCheckout == null ? (
        <div className="end-section">
          <button onClick={() => onClick(_id)} className="end-button">
            End Session
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default connect(null, { endEntry })(EntryItem);
