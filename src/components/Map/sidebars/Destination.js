import React, { Component } from 'react';
import { Sidebar, Button, Menu, Icon, Modal, Select, Header, Container, Grid, Popup } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { addDestinationRouteAsync, optimizeRoute } from '../../actions/routeActions';
import { deleteDests } from '../../actions/destinationActions';
import { store } from '../../store';

class Destination extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, desc: null, selected: process.env.optimizerType.TCP.name, modes: props.modes, open: false};
    this.size = props.destinations.length;
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

  optimize() {
    store.dispatch(optimizeRoute(this.state.selected));
    this.toggleModal();
  }

  _handleChange(value, element) {
    if (!element.value || element.value === '') {
      return;
    }

    const data = element.options.filter(e => {
      return e.value === element.value;
    })[0].data;

    this.setState({
      selected: element.value,
      desc: data
    });
  }

  toggleModal() {
    this.setState({
      open: !this.state.open
    });
  }

  startPointIsDefined(event, data) {
    const isStart = store.getState().destination[0].type;
    return (isStart === 'START');
  }

  openOptimModal() {
    if (!this.startPointIsDefined()) {
      this.props.notify.warning('please select a starting point using the search button');
      return;
    }

    this.toggleModal();
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
              key={dest.place_id}
              className="popup"
              trigger={
                <div onClick={() => this.getcoordinatesfor(dest)}>
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
            (<div>
              <Button icon='map' className="btn-route" fluid color='blue' size='medium' content='Compute routes' onClick={() => this.getRoute()} />
              <Button icon='setting' fluid color='black' size='medium' content='optimize routes' onClick={this.openOptimModal.bind(this)} />
              <Modal
                open={this.state.open}
                header='Optimization !'
                className="modal"
                content={(
                  <Container text style={{marginTop: 15}}>
                    <Header as='h4' className="flex-center" icon='plug' content='Select optimizing type' />
                    <Select placeholder='Select the Optimize Mode' options={this.state.modes} onChange={(e, element) => this._handleChange(e, element)} />
                    {this.state.desc && (
                      <p>{this.state.desc}</p>
                    )}
                  </Container>
                )}
                actions={[
                  { key: 'cancel', content: 'Cancel', positive: false, onClick: this.toggleModal.bind(this) },
                  { key: 'done', content: 'Optimize', positive: true, onClick: this.optimize.bind(this), className: 'btn-bleu' }
                ]}/>

            </div>)
          }
        </Sidebar>
      </div>
    );
  }
}

Destination.propTypes = {
  notify: PropTypes.object,
  visible: PropTypes.any,
  destinations: PropTypes.array,
  modes: PropTypes.array
};

export default Destination;
