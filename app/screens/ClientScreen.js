import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Form, Textarea, Button, Text } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';

class ClientScreen extends React.Component {
  static navigationOptions = {
    title: "FeedBack",
  };

  constructor(props) {
    super(props);

    this.state = {
      isRecogido: false,
      feedback: ""
    }
  }

  handleFeedbackPress = () => {
    axios.post('https://gittev1u10.execute-api.us-east-2.amazonaws.com/dev/queja',
      {
        recogida: this.state.isRecogido,
        textoqueja: this.state.feedback
      })
      .then((objResponse) => {
        alert("SUCCESS" + JSON.stringify(objResponse, null, 2));
      })
      .catch((objError) => {
        alert("ERROR" + JSON.stringify(objError, null, 2));
      })
  }

  render() {

    const radioProps = [
      { label: "Si", value: true },
      { label: "No", value: false }
    ]

    return (
      <Container>
        <Content padder>
          <Form style={styles.spacer}>
            <Text style={styles.text}>Le recogieron la basura?</Text>
            <View style={styles.radioContainer}>
              <RadioForm
                radio_props={radioProps}
                formHorizontal={true}
                labelHorizontal={true}
                initial={1}
                onPress={(value) => { this.setState({ isRecogido: value }) }}
              />
            </View>
            <Text style={styles.text}>Escriba aqui si tiene una queja o sugerencia</Text>
            <Textarea rowSpan={5} bordered
              onChangeText={(text) => this.setState({ feedback: text })}>
              {this.state.feedback}
            </Textarea>
          </Form>
          <Button block info style={styles.spacer}
            onPress={this.handleFeedbackPress}>
            <Text>Enviar Feedback</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spacer: {
    marginTop: 10
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  }
});

export default ClientScreen;