"use strict";
import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import countryService from "../Service/country.js";

class CountrySelector extends React.Component
{

    constructor(props){
        super(props);

        this.OnChange = this.OnChange.bind(this);
        this.Reset = this.Reset.bind(this);
    }

    OnChange(event, index, newValue){
        this.props.ChangeCountries(newValue);

        this.props.OnChange && this.props.OnChange(newValue);
    }

    Reset(event){
        if(event.button === 2)
        {
            this.props.ChangeCountries([]);//обнуляем список стран
            event.nativeEvent.preventDefault();
        }
    }

    render(){
        const csList = countryService.GetNameList().map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );
        return (
            <SelectField onMouseDown={this.Reset} multiple value={this.props.countriesList} onChange={this.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}

import {connect} from "react-redux";
import {TupleChangeCountries} from "../App/tupleAc.js";
const S2P = state => ({
    countriesList: state.tupleDomain.tupleCreate.data.countries,
});
const D2P = dsp => ({
    ChangeCountries: countries => dsp(TupleChangeCountries(countries)),
});
export default connect(S2P,D2P)(CountrySelector);