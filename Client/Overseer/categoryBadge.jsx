"use strict";
import React from "react";
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
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

    PingToLabel(pingTime)
    {
        var s = parseInt(pingTime/1000);
        if(s<60)
            return `${s} сек`;
        else
            if(60<=s && s < 3600)
                return `${parseInt(s/60)} мин`;
            else
                if(3600 <= s && s < 3600*24)
                    return `${parseInt(s/3600)} ч`;
                else
                    return `1 день`;
        throw new Error("Не обработанный случай в PingToLabel");
    }

    StatusToColor(status)
    {
        switch(status)
        {
            case "alert": return "crimson";
            case "poor": return "DarkOrange";
            case "ok": return "LimeGreen";
            default: throw new Error("Необработанный случай в StatusToColor");
        }
    }

    render(){
        var items = [];
        if(this.props.detailType === this.props.type)
        {
            items = this.props.list.statuses
                .sort((a,b) => b.lastPing-a.lastPing)
                .map(
                    (ex)=>(
                        <ListItem
                            style={{borderBottom:"1px solid lightgrey"}}
                            key={ex.id}
                        >
                            <span style={{display:"flex", flexWrap:"wrap"}}>
                                <span style={{flex:"1"}} >
                                    <span style={{color:"lightgrey"}}>{`#${ex.id}`}</span>
                                </span>
                                <span style={{flex:"1"}} >
                                    <span className="OverseerUptimeLabel" style={{color:this.StatusToColor(ex.status),borderColor:this.StatusToColor(ex.status), flex:"1"}}>{this.PingToLabel(ex.lastPing)}</span>
                                </span>
                                <span style={{flex:"1"}} >
                                    <span>{"\u00a0\u00a0"}{ex.hardname}</span>
                                </span>
                            </span>
                        </ListItem>
                    )
            );
        }

        return (
            <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={items.length===0?<ExpandMore />:<ExpandLess />}
                onClick={()=>this.props.SetDetailView(this.props.type)}
                onNestedListToggle={()=>this.props.SetDetailView(this.props.type)}
                primaryText={categoryToTitle[this.props.type]}
                secondaryText={
                    <span>
                        [{this.props.totalCount}]: 
                        <span style={okCountStyle} >{this.props.okCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={poorCountStyle} >{this.props.poorCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={alertCountStyle} >{this.props.alertCount}</span>
                    </span>
                }
                open={items.length===0?false:true}
                nestedItems={items}
            />
        );
    }
}