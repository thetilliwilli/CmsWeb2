"use strict";
import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { login: "", password: ""};

    this.OnSubmit = this.OnSubmit.bind(this);
    this.OnChange = this.OnChange.bind(this);
  }

  OnSubmit(event) {
    event.preventDefault();

    var login = this.state.login;
    var password = this.state.password;

    const jsonRequest = JSON.stringify({ login, password });

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200)
      {
        window.location.href = "/";
      }
      else
      {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
        alert('Invalid form data');
      }
    });
    xhr.send(jsonRequest);
  }

  OnChange(event) {
    var name = event.target.name;
    this.state[name] = event.target.value;
    this.setState(this.state);
  }

  render() {
    return (
      <Card className="LoginPage">
          <CardTitle title="Login" />
          <form action="/" onSubmit={this.OnSubmit}>
            <TextField autoFocus name="login" value={this.state.login} onChange={this.OnChange} hintText="Login" floatingLabelText="Type Login" /><br />
            <TextField name="password" value={this.state.password} onChange={this.OnChange} type="password" hintText="Password" floatingLabelText="Type Password" /><br />
            <RaisedButton type="submit" label="Create New Account" primary />
            {/* <CardText>Doesn't have an account? <Link to={'/signup'}>Signup</Link></CardText> */}
          </form>
      </Card>
    );
  }
}