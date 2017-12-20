import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { addDestination } from '../../actions/map/destinationActions';
import { getDescription } from '../../actions/map/descriptionActions';
import { store } from '../../store';
import PropTypes from 'prop-types';
import '../../stylesheets/components/map.scss';

class PopupContent extends Component {
  constructor(props) {
    super(props);

    this.typeMarkers = {
      restaurant: '../../../media/icons/cutlery.svg',
      bar: '../../../media/icons/cocktail.svg',
      pub: '../../../media/icons/beer.svg',
      hotel: '../../../media/icons/bed.svg',
      cafe: '../../../media/icons/coffee-cup.svg'
    };
  }

  showDescription() {
    store.dispatch(getDescription({
      id: this.props.POI.place_id,
      name: this.props.POI.display_name[0],
      type: this.typeMarkers[this.props.POI.type],
      user_id: this.props.user.id
    }));

    this.props.close();
  }

  addDestination() {
    store.dispatch(addDestination({
      name: this.props.POI.display_name[0],
      type: this.props.POI.type,
      place_id: this.props.POI.place_id,
      lat: this.props.POI.lat,
      lon: this.props.POI.lon,
      osm_type: this.props.POI.osm_type
    }));

    this.props.close();
    this.props.removePoint(this.props.POI.place_id);
  }

  render() {
    return (
      <Card className="popup-card">
        <Button className="close" icon='close' onClick={this.props.close} floated="right" />
        <div className="popup-card-top">
          <Image floated='left' size='mini' src={this.typeMarkers[this.props.POI.type]} />
        </div>
        <Card.Content>
          <Card.Header>
            {this.props.POI.display_name[0]}
          </Card.Header>
          <Card.Meta>
            {this.props.POI.display_name[1]} - ({this.props.POI.type})
          </Card.Meta>
          <Card.Description>
            {this.props.POI.display_name[3]}
            {this.props.POI.display_name[4]}
            {this.props.POI.display_name[7]}
            {this.props.POI.display_name[8]}
          </Card.Description>
        </Card.Content>
        <Card.Content extra id="content-bottom">
          <div>
            <Button basic id="btn-add" icon='plus' onClick={() => {
              this.addDestination();
              this.props.close();
            }} />
            <Button basic color='blue' icon='info' id='btn-information' onClick={() => this.showDescription()}/>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

PopupContent.propTypes = {
  close: PropTypes.func,
  type: PropTypes.any,
  POI: PropTypes.object,
  user: PropTypes.object,
  removePoint: PropTypes.func
};

export default PopupContent;
