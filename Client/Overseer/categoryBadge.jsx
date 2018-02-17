"use strict";
import React from "react";
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

const okCountStyle = {
    color: "LimeGreen",
};

const poorCountStyle = {
    color: "DarkOrange",
};

const alertCountStyle = {
    color: "crimson",
};

const totalCountStyle = {
    color: "lightslategrey",
};

const categoryToTitle = {
    tuple: "Энциклопедия",
    exhibit: "Электронные этикетки",
    golo: "Сенсорные этикетки",
    bureau: "Предприятия",
    designer: "Конструкторы",
};

export default class CategoryBadge extends React.Component
{
    render(){
        return (
            <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                onClick={()=>this.props.SetDetailView(this.props.type)}
                primaryText={categoryToTitle[this.props.type]}
                secondaryText={
                    <span>
                        <span style={okCountStyle} >{this.props.okCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={poorCountStyle} >{this.props.poorCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={alertCountStyle} >{this.props.alertCount}</span>
                    </span>
                }
            />
        );
    }
}