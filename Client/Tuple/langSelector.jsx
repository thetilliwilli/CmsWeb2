import React from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

class LangSelector extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        var LangTabList = this.props.langList.map(i=><Tab label={i.label} value={i.label} key={i.label}/>);
        return (
            <Tabs onChange={this.props.ChangeLang} value={this.props.lang}>
                {LangTabList}
            </Tabs>
        );
    }
}

LangSelector.defaultProps = {
    langList: [
        {label: "ru"},
        // {label: "en"}
    ]
};

import {connect} from "react-redux";
import {ChangeLanguage} from "../App/tupleAc.js";
const S2P = state => ({
    lang: state.tupleDomain.language
});
const D2P = dsp=>({
    ChangeLang: (value)=>{dsp(ChangeLanguage(value))}
});
export default connect(S2P, D2P)(LangSelector);