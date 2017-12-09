import React, { Component } from 'react';
import { Sidebar, Button, Menu, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { addDestinationRouteAsync, deleteDests } from './../../../actions/map/destinationActions';
import { store } from './../../../store';

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.size = props.destinations.length;
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  handleRemove(id) {
    store.dispatch(deleteDests(id));
  }

  getRoute() {
    store.dispatch(addDestinationRouteAsync());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.destinations.length === this.size) {
      return;
    }
    this.size = nextProps.destinations.length;
    this.setState({ visible: true });
  }

  render() {
    return (
      <div>
        <Sidebar
          as={Menu}
          style={{paddingTop: 88, zIndex: 5}}
          animation='overlay'
          width='wide'
          visible={this.state.visible}
          icon='labeled'
          vertical
        >
          <Button icon='close' floated='right' color='google plus' onClick={() => this.toggleVisibility()} />
          <div style={{marginTop: 55}}>
            {this.props.destinations.map((dest) => (
              <div key={dest.place_id}>
                <Button icon='close' color='red' onClick={() => this.handleRemove(dest.place_id)} />
                <Menu.Item name='home'>
                  <Icon name='home' />
                  {dest.name}
                </Menu.Item>
              </div>
            ))}
          </div>
          <Button icon='map' fluid color='blue' size='medium' content='Compute routes' onClick={() => this.getRoute()} />
        </Sidebar>
      </div>
    );
  }
}

Destination.propTypes = {
  visible: PropTypes.any,
  destinations: PropTypes.array
};

export default Destination;
