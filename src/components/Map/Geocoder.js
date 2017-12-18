import React from 'react';
import { PropTypes } from 'prop-types';
import { Input, Transition, List, Button, Icon, Modal, Header, Label } from 'semantic-ui-react';
import XHR from '../../helpers/XHRClient';


class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], focus: null, loading: false, searchTime: new Date(), visible: false };

    this.onInput.bind(this);
    this.moveFocus.bind(this);
    this.onKeyDown.bind(this);
    this.onResult.bind(this);
  }

  onInput(e) {
    if (!e.target.value) {
      this.resetResults();
      return;
    }
    this.setState({ loading: true });
    XHR.search(this.props.endpoint, this.props.source, this.props.accessToken, this.props.proximity, e.target.value, this.onResult.bind(this));
  }

  moveFocus(dir) {
    if (this.state.loading) {
      return;
    }
    this.setState({
      focus: Math.max(0, Math.min(this.state.results.length - 1, this.state.focus + dir))
    });
  }

  onKeyDown(e) {
    switch (e.which) {
    case 38: /* UP */
      e.preventDefault();
      this.moveFocus(-1);
      break;
    case 40:/* DOWN */
      this.moveFocus(1);
      break;
    case 13: /* VALID */
      if (this.state.focus === null) {
        return;
      }
      this.toggleModal();
      this.props.onSelect(this.state.results[this.state.focus]);
      break;
    case 27: /* ESC */
      this.toggleModal();
      break;
    default:
      break;
    }
  }

  onResult(err, res, body, searchTime) {
    // searchTime is compared with the last search to set the state
    if (!err && body && body.features && this.state.searchTime <= searchTime) {
      this.setState({
        searchTime: searchTime,
        loading: false,
        results: body.features,
        focus: 0
      });
      // callback that can be used in parrent
      this.props.onSuggest(this.state.results);
    }
  }

  clickOption(place, listLocation) {
    this.props.onSelect(place);
    this.setState({ focus: listLocation, visible: false });
    return false;
  }

  resetResults(adds = {}) {
    this.setState({
      ...adds,
      results: [],
      focus: null,
      loading: false
    });
  }

  toggleModal() {
    this.resetResults({ visible: !this.state.visible });
  }

  render() {
    return (
      <div>
        <Button className="btn-search" onClick={() => this.toggleModal()} >
          <Icon name='search' /> search
        </Button>

        <Modal open={this.state.visible}>

          <Button className="close" className="btn-close-modal" icon='close' onClick={() => this.toggleModal()} floated="right" />

          <Modal.Header>
            <Icon name='map' color='white' />
            Research a localisation
            <Input
              icon={{ name: 'search', circular: true, link: true }}
              style={{marginLeft: 15}}
              ref='input'
              type='text'
              onInput={(e) => this.onInput(e)}
              onKeyDown={(e) => this.onKeyDown(e)}
              placeholder={this.props.inputPlaceholder} />
          </Modal.Header>
          <Modal.Content scrolling style={{height: 250, overflow: 'auto'}}>

            <Modal.Description>
              <Header className="flex-center" >Results:</Header>
              <Transition.Group
                as={List}
                duration={200}
                divided
                size='huge'
                verticalAlign='middle'>

                {this.state.results.length > 0 && this.state.results.map((result, i) => (
                  <List.Item className="list-item" key={result.id} style={{cursor: 'pointer'}} onClick={this.clickOption.bind(this, result, i)}>
                    {this.state.focus === i && (
                      <Icon name='send' />
                    )}
                    {result.place_name}
                  </List.Item>
                ))}
              </Transition.Group>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions />
        </Modal>
      </div>
    );
  }
}


Geocoder.propTypes = {
  endpoint: PropTypes.string,
  source: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSuggest: PropTypes.func,
  accessToken: PropTypes.string.isRequired,
  proximity: PropTypes.string
};

/* ================================
 * default properties for geocoding
 * ================================
 */
Geocoder.defaultProps = {
  endpoint: 'https://api.tiles.mapbox.com',
  inputPlaceholder: 'Search',
  source: 'mapbox.places',
  proximity: '',
  onSuggest: function () { }
};

export default Geocoder;
