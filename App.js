import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { MapView } from 'expo';

let Marker = MapView.Marker;

export default class App extends React.Component {
  state = {
    editable: true,
    latitude: 0,
    longitude: 0,
  }

  setMarker(event) {
    const { nativeEvent } = event;
    const { latitude, longitude } = nativeEvent.coordinate;

    this.setState({
      latitude,
      longitude,
    });
  }

  render() {
    const { editable, latitude, longitude } = this.state;
    const scWidth = Dimensions.get('screen').width - 10;

    return (
      <View style={styles.container}>
        <Button title="Press edit/view" onPress={() => this.setState({ editable: !editable })} />
          
        { editable ? <Text>Editable</Text> : <Text>View only</Text> }
        
        <MapView style={{ width: scWidth, height: scWidth }}
          onPress={event => this.setMarker(event)}>

          { latitude !== 0 && longitude !== 0 ? 
            <Marker coordinate={{
              latitude: latitude,
              longitude: longitude,
              }}
            /> : undefined
          }

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
