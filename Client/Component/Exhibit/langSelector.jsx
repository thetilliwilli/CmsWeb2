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
            <Tabs onChange={this.props.ChangeLang}>
                {LangTabList}
            </Tabs>
        );
    }
}

LangSelector.defaultProps = {
    langList: [
        {label: "ru"},
        {label: "en"}
    ]
};

import {connect} from "react-redux";
import {ChangeExhibitLanguage} from "../../App/ac.js";
const MapDispatchToProps = dispatch=>({
    ChangeLang: (v)=>{dispatch(ChangeExhibitLanguage(v))}
});
export default connect(null, MapDispatchToProps)(LangSelector)