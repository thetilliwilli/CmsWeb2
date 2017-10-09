"use strict";
import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import catsub from "../Service/catsub.js";

export default class CatsubSelector extends React.Component
{

    constructor(props){
        super(props);

        this.state = {selected: catsub.default.name};

        this.OnChange = this.OnChange.bind(this);
    }

    OnChange(event, index, newValue){
        this.setState({selected: newValue});

        this.props.OnChange && this.props.OnChange(newValue);
    }

    render(){
        const csList = catsub.GetNameList().map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );
        return (
            <SelectField value={this.state.selected} onChange={this.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}