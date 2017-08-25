import React from "react";
import TextField from 'material-ui/TextField';

export default class TitleHeader extends React.Component
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
            <div className="TitleHeader">
                <TextField hintText="Введите текст" floatingLabelText="Заголовок Экспоната" />
                <br />
                <TextField hintText="Введите текст" floatingLabelText="Подзаголовок Экспоната" />
            </div>
        );
    }
}