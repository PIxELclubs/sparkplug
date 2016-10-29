import React from 'react';
import {connect} from 'react-redux';
import BannerOutput from '../components/BannerOutput';

const mapStateToProps = ({form}) => form;
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true,
    withRef: true
  }
)(BannerOutput);
