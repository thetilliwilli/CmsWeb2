"use strict";
import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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
      <div style={{width:"50%", height:"100%", margin:"auto", display:"flex", flexDirection:"column", justifyContent:"flex-start"}} >
        
        <div style={{width:"20%", margin:"5% auto 5% auto"}} >
          <img style={{width:"100%", height:"auto"}} src="/Static/icon/visualsMuseumIcon.png" />
          <img style={{width:"100%", height:"auto"}} src="/Static/icon/visualsIcon.png" />
        </div>

        <div className="LoginPage" zDepth={3} style={{width:"100%", margin:"0px auto 0px auto", display:"flex", padding:"10%", boxShadow:"0px 0px 80px 0px lightgrey", borderRadius:"15px"}} >
            <form action="/" onSubmit={this.OnSubmit} style={{width:"70%", margin:"auto"}} >
              <CardTitle title="Вход" style={{width:"100%", margin:"auto", textAlign:"center"}} titleColor="grey" />
              <TextField style={{width:"100%",}} autoFocus name="login" value={this.state.login} onChange={this.OnChange} hintText="Введите логин" floatingLabelText="Логин" /><br />
              <TextField style={{width:"100%",}} name="password" value={this.state.password} onChange={this.OnChange} type="password" hintText="Введите пароль" floatingLabelText="Пароль" /><br />
              <div style={{width:"60%", margin:"auto"}} >
                <RaisedButton type="submit" label="Войти" primary fullWidth />
              </div>
              {/* <CardText>Doesn't have an account? <Link to={'/signup'}>Signup</Link></CardText> */}
            </form>
        </div>
        
      </div>
    );
  }
}