import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Container, Icon, Menu, Segment } from 'semantic-ui-react';
import { store } from '../../store';
import PropTypes from 'prop-types';
import { dropUserAsync } from '../../actions/userActions';

class GlobalMenu extends Component {
  constructor(props) {
    super(props);
  }

  logOut() {
    store.dispatch(dropUserAsync());
  }

  // Must be improve, keep it for cam&fran
  render() {
    return (
      <div>
        <Segment
          className="header-background"
          textAlign='center'
          vertical
          style={{zIndex: 3}}
        >
          <Container>
            <Menu inverted pointing stackable size='small'>
              <Menu.Item as={Link} to='/' active>Home</Menu.Item>
              <Menu.Item as={Link} to='/faq'>Faq</Menu.Item>
              <Menu.Item as='a'>Company</Menu.Item>
              <Menu.Item as='a'>Careers</Menu.Item>
              <Menu.Item position='right'>
                {
                  this.props.userSession ? (
                    <div>
                      <Button as={Link} to='/map' className="btn-header" color='orange'><Icon name="map"/> Map </Button>
                      <Button as={Link} to='/edit' className="btn-header"><Icon name="setting"/> Settings </Button>
                      <Button as={Link} to='/' onClick={() => {
                        this.logOut();
                      }} style={{ marginLeft: '0.5em' }} className="btn-header"> <Icon name="log out" /> Log Out </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        as={Link}
                        to='/login'
                        className="btn-header"
                      > <Icon name="user" /> Log In </Button>
                      <Button
                        as={Link}
                        to='/sign-up'
                        style={{ marginLeft: '0.5em' }}
                        className="btn-header"
                      > <Icon name="sign in"/> Sign In </Button>
                    </div>
                  )
                }
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </div>
    );
  }
}

GlobalMenu.propTypes = {
  userSession: PropTypes.bool
};

export default GlobalMenu;
