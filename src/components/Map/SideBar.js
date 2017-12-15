import React, { Component } from 'react';
import { Sidebar, Button, Menu, Icon, Grid, Popup } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { addDestinationRouteAsync, deleteDests } from '../../actions/destinationActions';
import { store } from '../../store';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.size = props.destinations.length;
    console.log(props.destinations);
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  isDestinationsPropsPositiv() {
    return !(this.props.destinations.length < 1);
  }

  handleRemove(id) {
    store.dispatch(deleteDests(id));
  }

  getRoute() {
    store.dispatch(addDestinationRouteAsync());
  }

  getcoordinatesfor(destination) {
    if (!destination) {
      return;
    }

    if (destination.lat && destination.lon) {
      const coords = [
        +destination.lon,
        +destination.lat
      ];

      console.log(coords);
    }
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
        <Button className="btn-close" icon='bars' onClick={() => this.toggleVisibility()} />
        <Sidebar id="left-sidebar" as={Menu} animation='push' width='wide' visible={this.state.visible} icon='labeled' vertical>
          {this.props.destinations.map((dest) => (
            <Popup
              className="popup"
              trigger={
                <div key={dest.place_id} onClick={() => this.getcoordinatesfor(dest)}>
                  <Button className="btn-close-item" icon='close' onClick={() => this.handleRemove(dest.place_id)} />
                  <Menu.Item name='home'>
                    <Grid>
                      <Grid.Column width={4}>
                        <Icon name='home' />
                      </Grid.Column>
                      <Grid.Column width={12}>
                        <p>
                          {dest.name}
                        </p>
                      </Grid.Column>
                    </Grid>
                  </Menu.Item>
                </div>
              }
              content="Cliquer pour centrer la map"
              position='right center'
            />
          ))}
          {this.isDestinationsPropsPositiv() &&
            (<Button icon='map' className="btn-route" fluid color='blue' size='medium' content='Compute routes' onClick={() => this.getRoute()} />)
          }

        </Sidebar>
      </div>
    );
  }
}

SideBar.propTypes = {
  visible: PropTypes.any,
  destinations: PropTypes.array
};

export default SideBar;
