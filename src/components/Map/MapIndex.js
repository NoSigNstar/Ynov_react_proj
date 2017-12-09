import React, { Component } from 'react';
import ReactMapboxGl, { Marker, GeoJSONLayer } from 'react-mapbox-gl';
import { Icon } from 'semantic-ui-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import Clusters from './Clusters';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import { store } from '../../store';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import mbUtils from 'mapbox-gl';
import SideBar from './SideBar';
import Geocoder from './Geocoder';

class MapIndex extends Component {
  constructor(props) {
    super(props);

    this.Map = ReactMapboxGl({
      accessToken: process.env.MapboxKey,
      doubleClickZoom: false
    });

    const bdxBounds = mbUtils.LngLatBounds.convert([-0.6278705830770548, 44.819456570377326, -0.5460090245184119, 44.865412182320085]);
    const bdxCenter = [-0.580816, 44.836151];
    this.state = { coord: bdxCenter, mapBounds: bdxBounds };
    this._getInfos.bind(this);
  }

  _getInfos(map, infos) {
    this.setState({
      mapBounds: map.getBounds()
    });
  }

  _handleSelect(value) {
    console.log(value);
  }

  render() {
    return (
      <this.Map
        onMoveEnd={(v, m) => this._getInfos(v, m)}
        className={'map'}
        center={this.state.coord}
        style={process.env.MapboxTilesStyle} containerStyle={{
          height: '91%',
          width: '100%'
        }}>

        {/* GEOCODER */}
        <Geocoder
          accessToken={process.env.MapboxKey}
          onSelect={this._handleSelect}
          showLoader={true}
        />

        {/* Sidebar used to store Selected Destinations */}
        <SideBar destinations={this.props.destinations} />

        {/* Clusters of destination, contains all markers */}
        <Clusters bounds={this.state.mapBounds} />

        {/* Geojson Routes, contains all the path between destinations */}
        {this.props.geoRoutes.routes && (
          <GeoJSONLayer
            data={this.props.geoRoutes.routes[0].geometry}
            linePaint={{ 'line-color': '#F51332', 'line-width': 4 }}
            lineLayout={{ 'line-join': 'round', 'line-cap': 'round' }}
            type='lineLayout'/>
        )}
      </this.Map>
    );
  }
}

MapIndex.propTypes = {
  route: PropTypes.any,
  destinations: PropTypes.array,
  geoRoutes: PropTypes.object
};

const reduxConnecter = (nextState, ownProps) => {
  return {
    destinations: nextState.destination,
    geoRoutes: nextState.routes
  };
};

export default connect(reduxConnecter)(MapIndex);
