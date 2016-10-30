import Snackbar from 'material-ui/Snackbar/Snackbar';
import {connect} from 'react-redux';
import {resetSnackbar} from '../actions';

const mapStateToProps = state => ({
  ...state.snackbar,
  autoHideDuration: 3500
});
const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(resetSnackbar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {
    pure: true
  }
)(Snackbar);
