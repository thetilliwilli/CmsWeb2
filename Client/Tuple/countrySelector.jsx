"use strict";
import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import countryService from "../Service/country.js";

export default class CountrySelector extends React.Component
{

    constructor(props){
        super(props);

        this.state = {selected: null};

        this.OnChange = this.OnChange.bind(this);
        this.Reset = this.Reset.bind(this);
    }

    OnChange(event, index, newValue){
        this.setState({selected: newValue});

        this.props.OnChange && this.props.OnChange(newValue);
    }

    Reset(event){
        if(event.button === 2)
        {
            this.setState({selected: null});
            event.preventDefault();
        }
    }

    render(){
        const csList = countryService.GetNameList().map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );
        return (
            <SelectField onMouseDown={this.Reset} multiple value={this.state.selected} onChange={this.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}