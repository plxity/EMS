import React, { Fragment } from 'react';
import loader from './loading.gif';

export default () => (
  <Fragment>
    <img
      src={loader}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
