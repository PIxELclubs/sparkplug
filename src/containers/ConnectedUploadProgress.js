import {connect} from 'react-redux';
import UploadProgress from '../components/UploadProgress';
import {resetUploadProgress} from '../actions/upload';

const mapStateToProps = state => ({
  ...state.upload,
  autoHideDuration: 1000
});
const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(resetUploadProgress())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true
  }
)(UploadProgress);
