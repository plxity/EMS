import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../Utils/Spinner";
import { getEntry } from "../../actions/Entry";
import EntryItem from "./EntryItem";

const Sessions = ({ getEntry, entry: { entryDetails, loading } }) => {
  useEffect(() => {
    getEntry();
  }, [getEntry]);

  const CurrentSession = (
    <Fragment>
      <h1 className="large text-primary">Current Session</h1>
      <Link to="/">
        <button className="goback-button">Go Back</button>
      </Link>
      <div className="sessions">
        {entryDetails &&
          entryDetails.map(
            details =>
              details.visitorCheckout === null && (
                <EntryItem key={details._id} details={details} />
              )
          )}
      </div>
    </Fragment>
  );
  const EndedSession = (
    <Fragment>
      <h1 className="large text-primary">Ended Session</h1>
      <Link to="/">
        <button className="goback-button">Go Back</button>
      </Link>
      <div className="sessions">
        {entryDetails &&
          entryDetails.map(
            details =>
              details.visitorCheckout !== null && (
                <EntryItem key={details._id} details={details} />
              )
          )}
      </div>
    </Fragment>
  );
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {window.location.pathname === "/currentSession"
        ? CurrentSession
        : EndedSession}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  entry: state.entry
});

export default connect(mapStateToProps, { getEntry })(Sessions);
