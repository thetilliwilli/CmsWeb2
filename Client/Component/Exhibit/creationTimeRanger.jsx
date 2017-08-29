import React from "react";
import DatePicker from 'material-ui/DatePicker';


export default class CreationTimeRanger extends React.Component
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
            <div>
                <DatePicker floatingLabelText="Начало" openToYearSelection defaultDate={new Date()} style={{width:"30%"}}></DatePicker>
                <DatePicker floatingLabelText="Окончание" openToYearSelection defaultDate={new Date()} style={{width:"30%"}}></DatePicker>
            </div>
        );
    }
}