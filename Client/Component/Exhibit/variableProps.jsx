"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"

function ControlPanel(props){
    return (
        <div className="VariableProps_ControlPanel">
            <TextField hintText="New Property Name" underlineShow={false} />
            <FloatingActionButton mini> <ContentAdd /> </FloatingActionButton>
            <Divider />
        </div>
    );
}

const VariablePropsList = (p)=>(
    <ul className="VariablePropsList" style={{listStyle:"none"}}>
        {p.items.map(i=>
            <li key={i.name}>
                <TextField hintText={i.name} floatingLabelText={i.name} defaultValue={i.value} />
                <IconButton><ActionDelete /></IconButton>
            </li>
        )}
    </ul>
);

export default class VariableProps extends React.Component
{
    render(){
        return (
            <div className="VariableProps">
                <CardHeader  subtitle="ХАРАКТЕРИСТИКИ" />
                <div className="VariableProps_ControlPanel_Wrapper">
                    <ControlPanel />
                    <VariablePropsList items={[{name:"Длинна ствола"}, {name:"Вес"}, {name:"Материал"}]}/>
                </div>
            </div>
        );
    }
}