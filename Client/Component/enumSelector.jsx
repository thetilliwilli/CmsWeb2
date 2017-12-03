"use strict";
import React from "react";

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EnumSelector extends React.Component
{
    render(){

        const csList = this.props.enum.map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );

        return (
            <SelectField value={this.props.enum[this.props.value]} onChange={this.props.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}

export default EnumSelector;