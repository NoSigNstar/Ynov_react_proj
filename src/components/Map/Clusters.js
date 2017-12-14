import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Cluster, Popup } from 'react-mapbox-gl';
import { Icon, Button } from 'semantic-ui-react';
import { randomBytes } from 'crypto';
import PopupContent from './PopupContent';
import NominatimeWrapper from './NominatimeWrapper';
import PropTypes from 'prop-types';

class Clusters extends Component {
  constructor(props) {
    super(props);

    this.state = { popup: false, coord: null, markers: [] };

    try {
      this.nominatimeWrapper = new NominatimeWrapper(['bar', 'restaurant', 'hotel', 'pub', 'cafe'], {
        'accept-language': 'FR',
        limit: 1000
      });
    } catch (e) {
      console.error(e);
    }

    this._closePopup.bind(this);
  }

  componentDidMount() {
    this.getPOIData();
  }

  getPOIData() {
    const bounds = this.props.bounds || null;
    let response = null;

    try {
      response = this.nominatimeWrapper.RunWithBounds(bounds);
    } catch (e) {
      console.error(e);
    }

    response.then((r) => {
      response = [].concat.apply([], r);
      // remove data hold by the current user
      if (this.props.destIds.length > 0) {
        response = response.filter(e => !this.props.destIds.includes(+e.place_id));
      }

      this.setState({
        markers: response
      });
    });
  }

  clusterMarker(coordinates, pointCount) {
    return (
      <Marker coordinates={coordinates} key={randomBytes(150)} >
        <div className="nbr-markers">
          <span style={{ color: 'white' }}>{pointCount}</span>
        </div>
      </Marker>
    );
  }

  showPopup(POI, key) {
    this.setState({
      popup: POI,
      coord: [POI.lon, POI.lat]
    });
  }

  _closePopup() {
    this.setState({
      popup: false
    });
  }

  removePoint(placeId) {
    const newMarkers = this.state.markers.filter((e) => {
      return e.place_id !== placeId;
    }).map(e => e);

    this.setState({
      markers: newMarkers
    });
  }

  render() {
    return (
      <div>
        {this.state.popup &&
                    (<Popup
                      key={'popup'}
                      coordinates={this.state.coord}
                      style={{ zIndex: 99999 }} >
                      <PopupContent POI={this.state.popup} close={this._closePopup.bind(this)} user={this.props.user} removePoint={this.removePoint.bind(this)} />
                    </Popup>)
        }
        <Cluster zoomOnClickPadding={20} zoomOnClick={true} ClusterMarkerFactory={this.clusterMarker}>
          {
            this.state.markers.map((POI, key) => {
              const coords = [parseFloat(POI.lon), parseFloat(POI.lat)];

              return (<Marker
                style={{cursor: 'pointer'}}
                key={key}
                coordinates={coords}
                onClick={(e) => this.showPopup(POI, key)}>
                <img src='../../../media/icons/location.svg' style={{
                  maxHeight: '35px'
                }}/>
              </Marker>);
            }
            )
          }
        </Cluster>
      </div>
    );
  }
}

Clusters.propTypes = {
  bounds: PropTypes.object,
  user: PropTypes.object,
  destIds: PropTypes.array
};

export default Clusters;
