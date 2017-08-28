"use strict";
import React from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';

export default class SignupPage extends React.Component
{
    constructor(props){
        super(props);
        this.OnSubmit = this.OnSubmit.bind(this);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    OnSubmit(){

    }

    render(){
        return (
            <div className="SignupPage">
              <CardTitle title="Регистрация" />
              <form action="/" onSubmit={this.OnSubmit}>
                <TextField hintText="Email" floatingLabelText="Type Email" /><br />
                <TextField hintText="Password" floatingLabelText="Type Password" /><br />
                <RaisedButton type="submit" label="Create New Account" primary />
                <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
              </form>
            </div>
        );
    }
}