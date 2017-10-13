"use strict";
import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import catsub from "../Service/catsub.js";

class CatsubSelector extends React.Component
{

    constructor(props){
        super(props);

        // this.state = {selected: props.value};
        this.OnChange = this.OnChange.bind(this);
    }

    OnChange(event, index, newValue){
        // this.setState({selected: newValue});
        const theMode = this.props.isEditMode ? "Edit" : "Create";
        this.props.CatsubChange(theMode, newValue);
        this.props.OnChange && this.props.OnChange(newValue);
    }

    render(){
        const theCatsub = this.props.isEditMode ? this.props.catsubEdit : this.props.catsubCreate;
        const csList = catsub.GetNameList().map(
            name => <MenuItem key={name} value={name} primaryText={name} />
        );
        return (
            <SelectField value={theCatsub} onChange={this.OnChange} floatingLabelFixed floatingLabelText={this.props.label} fullWidth >
                {csList}
            </SelectField>
        );
    }
}

import {connect} from "react-redux";
import {TupleCatsubChange} from "../App/tupleAc.js";
const S2P = state => ({
    catsubCreate: state.tupleDomain.tupleCreate.data.catsub,
    catsubEdit: state.tupleDomain.tupleEdit.data.catsub,
});
const D2P = dsp => ({
    CatsubChange: (mode, catsub) => dsp(TupleCatsubChange(mode, catsub)),
});
export default connect(S2P,D2P)(CatsubSelector);