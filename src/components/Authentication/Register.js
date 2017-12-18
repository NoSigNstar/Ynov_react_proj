import React, { Component } from 'react';
import { Button, Form, Container, Header, Segment, Image, Grid } from 'semantic-ui-react';
import { store } from '../../store';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/userActions';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, login: '', first_name: '', last_name: '', email: '', password: '', agreed: false };
  }

  _submit(form) {
    if (!this.state.agreed) {
      console.error('valid args !');
      return;
    }

    store.dispatch(createUser({...this.state}));
  }

  _triggerLoading() { // TODO: Use Sagas && connect to bind this methods #AskJuH
    this.setState({ loading: !this.state.loading });
  }

  __handleChange(input, name) {
    const value = (name === 'agreed') ? !this.state.agreed : input.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { login, first_name, last_name, email, password } = this.state;

    return (
      <Grid
        textAlign='center'
        style={{ height: '89%' }}
        verticalAlign='middle'
      >
        <Grid.Column>
          <Container>
            <Header as='h2' color='teal' textAlign='center'>
              <Image
                style={{ minWidth: 200 }}
                src='/media/travelnodebleu.svg' />
            </Header>
            <Segment stacked>
              <Form loading={this.state.loading} size='large'>
                <Form.Field unstackable widths={1}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    onChange={(e) => this.__handleChange(e, 'login')}
                    label='Login'
                    value={login}
                    placeholder='login' />
                </Form.Field>

                <Form.Group unstackable widths={2}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    onChange={(e) => this.__handleChange(e, 'first_name')}
                    label='First name'
                    value={first_name}
                    placeholder='First name' />
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    value={last_name}
                    onChange={(e) => this.__handleChange(e, 'last_name')}
                    label='Last name'
                    placeholder='Last name' />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                    icon='mail'
                    iconPosition='left'
                    label='E-mail'
                    value={email}
                    onChange={(e) => this.__handleChange(e, 'email')}
                    placeholder='e-mail'
                  />
                  <Form.Input
                    icon='unlock alternate'
                    iconPosition='left'
                    type="password"
                    label='Password'
                    value={password}
                    onChange={(e) => this.__handleChange(e, 'password')}
                    placeholder='Password'
                  />
                </Form.Group>

                <Form.Checkbox
                  label='I agree to the Terms and Conditions'
                  onChange={(e) => this.__handleChange(e, 'agreed')}
                />
                <Form.Input
                  className="Token"
                  style={{ display: 'none' }}
                />
                <Button
                  className="btn-bleu"
                  fluid size='large'
                  onClick={(form) => this._submit(form)}
                  type='submit'>
      Submit
                </Button>
              </Form>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

Register.propTypes = {
  userUpdate: PropTypes.func
};

export default Register;
