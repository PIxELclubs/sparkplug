import React from 'react';
import {connect} from 'react-redux';
import LogInButton from '../components/LogInButton';
import {toggleLogIn} from '../actions';

const mapStateToProps = state => state.login;
const mapDispatchToProps = dispatch => ({
  onTouchTap: () => {
    dispatch(toggleLogIn());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true
  }
)(LogInButton);
