import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import axios from 'axios';

class RutasScreen extends Component {
  static navigationOptions = {
    title: "Rutas",
  };

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    axios.get('https://gittev1u10.execute-api.us-east-2.amazonaws.com/dev/rutas')
      .then((objResponse) => {
        this.setState({ items: objResponse.data })
        console.log(JSON.stringify(objResponse, null, 2));
      })
      .catch((objError) => {
        console.log("ERROR" + JSON.stringify(objError, null, 2));
      })
  }

  _handleItemClick = (evt,item) => {
    this.props.navigation.navigate("Map", {data: item.clientes})
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.state.items}
            renderRow={(item) =>
              <ListItem key={item.id} onPress={(evt) => this._handleItemClick(evt,item)}>
                  <Text>{item.nombre}</Text>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spacer: {
    marginTop: 40
  }
});

export default RutasScreen;