import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';
import { store } from '../../store';
import PropTypes from 'prop-types';
import { fetchUser } from '../../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  submitHandler() {
    store.dispatch(fetchUser({ ...this.state }));
  }

  render() {
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '89%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image
                style={{ minWidth: 200 }}
                src='/media/travelnodebleu.svg' />
            </Header>
            <Form size='large' onSubmit={() => {
              this.submitHandler();
            }}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  name='login'
                  iconPosition='left'
                  required={true}
                  placeholder='E-mail address'
                  value={this.state.login}
                  onChange={(e, p) => {
                    this.handleChange(e, p);
                  }}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  required={true}
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={(e, p) => {
                    this.handleChange(e, p);
                  }}
                />

                <Button className="btn-bleu" fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={'/sign-up'}> Sign up </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  userUpdate: PropTypes.func
};

export default Login;
