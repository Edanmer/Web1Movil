import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { Marker, Polyline } from 'react-native-maps';
import lodash from 'lodash';

class MapScreen extends Component {
  static navigationOptions = {
    title: "Mapa",
  };

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params.data,
      mapRegion: {
        latitude: 18.463296,
        longitude: -69.929401,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  newArray = (length) => {

    const array = [];
    for (let index = 0; index < length; index++) {
      array.push('#7F0000');    
    }

    return array;
  }

  render() {
    const height = Dimensions.get('window').height;
    const coordenadas = lodash.map(this.state.data, (item) => {
      return { latitude: parseFloat(item.latitud), longitude: parseFloat(item.longitud)}
    });
    const strokes = this.newArray(coordenadas.length);

    return (
      <ScrollView style={{ flex: 1 }}>
        <MapView
          style={{ height: height - 10 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange} >
          {this.state.data.map((marker, index) => (
            <Marker key= {marker.id}
              coordinate={coordenadas[index]}
              title={marker.nombre}
            />
          ))}
          <Polyline
            coordinates={coordenadas}
            strokeColor="#000"
            strokeColors={strokes}
            strokeWidth={6}
          />
        </MapView>
      </ScrollView>
    );
  }
}

export default MapScreen;