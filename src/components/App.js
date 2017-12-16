import React, { Component } from 'react';
import '../stylesheets/main.scss';
import Header from './layouts/GlobalHeader';
import Footer from './layouts/GlobalFooter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { removeNotify } from '../actions/errorsAction';
import { store } from '../store';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextState) {
    if (!nextState.notifyDispatcher.notifyType) {
      return;
    }
    NotificationManager[nextState.notifyDispatcher.notifyType](nextState.notifyDispatcher.message);
    store.dispatch(removeNotify());
  }

  render() {
    const user = (this.props.user.token) ? true : false;
    const props = React.cloneElement(this.props.children, { userSession: user, notify: NotificationManager });

    return (
      <div id="page-wrapper" className="main-app">
        <Header userSession={user} {... this.props} />
        <div className="content-app">
          <NotificationContainer />
          {props}
        </div>
        <Footer userSession={user} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object
};

const reduxConnecter = (nextState, ownProps) => {
  return { user: nextState.user, notifyDispatcher: nextState.notifyDispatcher };
};

export default connect(reduxConnecter)(App);
