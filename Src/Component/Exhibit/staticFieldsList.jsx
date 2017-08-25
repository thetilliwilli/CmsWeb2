import React from "react";
import TextField from 'material-ui/TextField';

export default class StaticFieldsList extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return (
            <div className="StaticFieldsList">
                <TextField hintText="Введите текст" floatingLabelText="Заголовок Экспоната" />
            </div>
        );
    }
}