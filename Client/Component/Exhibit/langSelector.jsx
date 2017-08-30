import React from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

export default class LangSelector extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
    var LangTabList = this.props.langList.map(i=><Tab label={i.label} value={i.label} key={i.label}/>);
        return (
            <Tabs>
                {LangTabList}
            </Tabs>
        );
    }
}

LangSelector.defaultProps = {
    langList: [
        {label: "RUS"},
        {label: "ENG"},
        {label: "ZHS"},
    ]
};