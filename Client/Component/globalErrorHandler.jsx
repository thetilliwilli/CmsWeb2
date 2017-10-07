"use strict";
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const ErrorLabel = p => <div><span style={{color: "Crimson"}}>Error:</span> {p.message}</div>;

export default class GlobalErrorHandler extends React.Component
{
    constructor(props){
        super(props);

        this.state = {message: "", open: false};

        this.OnClose = this.OnClose.bind(this);
        this.ErrorHandler = this.ErrorHandler.bind(this);
    }

    componentDidMount(){
        window.addEventListener("error", this.ErrorHandler);
        console.log("GlobalErrorHandler:Attached:");
    }
    
    componentWillUnmount(){
        window.removeEventListener("error", this.ErrorHandler);
        console.log("GlobalErrorHandler:Dettached:");
    }
    
    ErrorHandler(error){
        this.setState({errorMessage: error.message});
        this.setState({open: true});
    }

    OnClose(){
        this.setState({open: false});
    }

    render(){
        return (
            <Snackbar
                open={this.state.open}
                message={<ErrorLabel message={this.state.message} />}
                autoHideDuration={5000}
                onRequestClose={this.OnClose}
            />
        );
    }
}