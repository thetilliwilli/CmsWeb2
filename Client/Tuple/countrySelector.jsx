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
        const theMode = this.props.isEditMode ? "Edit" : "Create";
        this.props.ChangeCountries(theMode, newValue);

        this.props.OnChange && this.props.OnChange(newValue);
    }

    Reset(event){
        if(event.button === 1)
        {
            const theMode = this.props.isEditMode ? "Edit" : "Create";
            this.props.ChangeCountries(theMode, []);//обнуляем список стран
            event.preventDefault();
        }
    }

    render(){
        const csList = countryService.GetNameList().map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );
        const theValue = this.props.isEditMode ? this.props.countriesListEdit: this.props.countriesListCreate;
        return (
            <SelectField onMouseDown={this.Reset} multiple value={theValue} onChange={this.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}

import {connect} from "react-redux";
import {TupleChangeCountries} from "../App/tupleAc.js";
const S2P = state => ({
    countriesListCreate: state.tupleDomain.tupleCreate.data.countries,
    countriesListEdit: state.tupleDomain.tupleEdit.data.countries,
});
const D2P = dsp => ({
    ChangeCountries: (mode, countries) => dsp(TupleChangeCountries(mode, countries)),
});
export default connect(S2P,D2P)(CountrySelector);