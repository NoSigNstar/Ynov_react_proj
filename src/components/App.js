import React, { Component } from 'react';
import '../stylesheets/main.scss';
import Header from './layouts/GlobalHeader';
import Footer from './layouts/GlobalFooter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = (this.props.user.token) ? true : false;
    const props = React.cloneElement(this.props.children, { userSession: user });

    return (
      <div id="page-wrapper" className="main-app">
        <Header userSession={user} {... this.props} />
        <div className="content-app">
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
  return { user: nextState.user };
};

export default connect(reduxConnecter)(App);
