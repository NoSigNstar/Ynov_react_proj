import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import UserNotConnected from './pathErrors/UserNotConnected';
import PropTypes from 'prop-types';

/**
 * The routes Manager ensure that roles and session are properly rendered
 * @param {* Roles can be defined from this classes ['admin', 'user', ...]} roles
 * @param {* Determine if the current call must be done from a user session or not} userRequired
 */
const Dispatcher = (roles, userRequired) =>
  (DynamicComponent, options = {}) => {
    class Manager extends Component {
      constructor(props) {
        super(props);
      }

      render() {
        if (userRequired && !this.props.userSession) {
          return (
            <Grid container columns={1}>
              <Grid.Column>
                <UserNotConnected />
              </Grid.Column>
            </Grid>
          );
        }

        if (options.raw) {
          return (
            <DynamicComponent userSession={this.props.userSession} notify={this.props.notify} />
          );
        }

        return (
          <Grid columns={1}>
            <Grid.Column>
              <DynamicComponent userSession={this.props.userSession} notify={this.props.notify} />
            </Grid.Column>
          </Grid>
        );
      }
    }

    Manager.propTypes = {
      userSession: PropTypes.bool,
      notify: PropTypes.object
    };

    return Manager;
  };

export default Dispatcher;
