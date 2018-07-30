import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import axios from 'axios';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  handleLoginPress = () => {
    axios.post('https://gittev1u10.execute-api.us-east-2.amazonaws.com/dev/login',
      {
        usuario: this.state.username,
        password: this.state.password
      })
      .then((objResponse) => {
        if (this.state.username === "chofer" && objResponse.data === "sucessfull") {
          this.props.navigation.navigate("Ruta");
        }
        else if (this.state.username === "cliente" && objResponse.data === "sucessfull") {
          this.props.navigation.navigate("Client");
        }
        else {
          alert("Password Incorrecto.");
        }   
      })
      .catch((objError) => {
        console.log("ERROR" + JSON.stringify(objError, null, 2));
      })
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form style={styles.spacer}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input value={this.state.username}
                onChangeText={(username) => this.setState({ username })} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password}
                onChangeText={(password) => this.setState({ password })} />
            </Item>
          </Form>
          <Button block info style={styles.spacer}
            onPress={this.handleLoginPress}>
            <Text>Sign In</Text>
          </Button>
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

export default LoginScreen;