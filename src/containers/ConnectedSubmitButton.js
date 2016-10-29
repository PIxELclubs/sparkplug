import React from 'react';
import {connect} from 'react-redux';
import {submit} from '../actions';
import SubmitButton from '../components/SubmitButton';

const mapStateToProps = ({form}) => form;
const mapDispatchToProps = (dispatch, {outputRefPromise}) => ({
  onTouchTap: e => {
    dispatch(submit(outputRefPromise));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true
  }
)(SubmitButton);
