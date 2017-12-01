"use strict";
import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import catsubService from "../Service/catsub.js";

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
        const csList = catsubService.GetNameList().map(
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
import {DesignerCatsubChange} from "../App/designerAc.js";
const S2P = state => ({
    catsubCreate: state.designerDomain.designerCreate.data.catsub,
    catsubEdit: state.designerDomain.designerEdit.data.catsub,
});
const D2P = dsp => ({
    CatsubChange: (mode, catsub) => dsp(DesignerCatsubChange(mode, catsub)),
});
export default connect(S2P,D2P)(CatsubSelector);