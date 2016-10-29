import React from 'react';
import {connect} from 'react-redux';
import {changeForm} from '../actions';
import Form from '../components/Form';

const mapStateToProps = ({form}) => form;
const mapDispatchToProps = dispatch => ({
  onChange: (e, props) => {
    dispatch(changeForm(props));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true
  }
)(Form);
