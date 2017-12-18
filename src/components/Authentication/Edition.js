import React, { Component } from 'react';
import { Button, Form, Card, Grid, Icon, Header, Image } from 'semantic-ui-react';
import {store} from '../../store';

const extra = (
  <a>
    <Icon name='mail' />
    {store.getState().user.email}
  </a>
);

class Edition extends Component {
  render() {
    const { email, firstName, lastName } = store.getState().user;
    return (
      <Grid
        textAlign='center'
        style={{ height: '89%' }}
        verticalAlign='middle'
      >
        <Grid.Column>
          <Header as='h2' color='teal' textAlign='center'>
            <Image
              style={{ minWidth: 300 }}
              src='/media/travelnodebleu.svg' />
          </Header>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Card
                  image='/media/travelnode.svg'
                  header={firstName + ' ' + lastName}
                  meta='Special User'
                  extra={extra}
                  fluid
                />
              </Grid.Column>
              <Grid.Column>
                <Form size='large'>

                  <Form.Group unstackable widths={2}>
                    <Form.Input
                      value={firstName}
                      icon='user'
                      iconPosition='left'
                      label='First name'
                      placeholder='First name' />
                    <Form.Input
                      value={lastName}
                      icon='user'
                      iconPosition='left'
                      label='Last name'
                      placeholder='Last name' />
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Form.Input
                      value={email}
                      icon='mail'
                      iconPosition='left'
                      label='E-mail'
                      placeholder='e-mail'
                    />
                    <Form.Input
                      icon='unlock alternate'
                      iconPosition='left'
                      type="password"
                      label='Password'
                      placeholder='Password'
                    />
                  </Form.Group>

                  <Form.Input
                    className="Token"
                    style={{ display: 'none' }}
                  />
                  <Button
                    className="btn-bleu"
                    color='teal'
                    fluid size='large'
                    type='submit'>
                    Update
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Edition;
