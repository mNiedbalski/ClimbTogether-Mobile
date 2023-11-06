import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class RecordClimbing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // add state variables here
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Route Name</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Grade</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Location</Label>
              <Input />
            </Item>
            <Button block>
              <Text>Record Climb</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
