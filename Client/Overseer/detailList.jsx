"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
        this.Reset = this.Reset.bind(this);
    }

    //Обнулить значения фильтра при щелчке средней кнопкой мыши
    Reset(event){
        if(event.button===1)
            this.props.OnChange(event, "");
    }

    render(){
        return (
            <div className="OverseerOverview_ControlPanel" style={{display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"10%", display:"flex", flexWrap:"wrap"}} >
                    <RaisedButton style={{ margin:"auto auto 10px auto"}} icon={<RefreshIcon />} onClick={this.props.OnRefresh}/>
                </div>
                <div style={{width:"90%"}} >
                    <TextField 
                        value={this.props.filterValue}
                        onChange={this.props.OnChange}
                        onMouseUp={this.Reset}
                        floatingLabelText="Поиск устройства" floatingLabelFixed={true}
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


class OverseerList extends React.Component
{
    constructor(props){
        super(props);
    }
        
    Filter(list, filterValue){
        
        switch(filterValue[0])
        {
            case "#"://Если первый знак Решетка то ищем по айдишнику
            case "№":
                return list.filter(i => i.id==filterValue.slice(1));
            case "?"://Если первый знак ЗнакВопроса то ищем по витрине
                return list.filter(i => i.desc==filterValue.slice(1));
            //Ищем по названию
            default:
                return list.filter(
                    i => i.hardname
                        ? i.hardname.toLowerCase().indexOf(filterValue.toLowerCase())!==-1
                        : true
                );
        }
    }

    PingToLabel(pingTime){
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

    StatusToColor(status){
        switch(status)
        {
            case "alert": return "crimson";
            case "poor": return "DarkOrange";
            case "ok": return "LimeGreen";
        }
        throw new Error("Необработанный случай в StatusToColor");
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var items = this.Filter(this.props.list.statuses, filterValue)
            .sort((a,b) => b.lastPing-a.lastPing);
        items = items.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                >
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${ex.id}`}</span>
                        <span className="OverseerUptimeLabel" style={{color:this.StatusToColor(ex.status),borderColor:this.StatusToColor(ex.status)}}>{this.PingToLabel(ex.lastPing)} назад</span>
                        <span>{"\u00a0\u00a0"}{ex.hardname}</span>
                    </span>
                </ListItem>
            )
        );
        return (
            <List className="GoloOverview_GoloList">
                <Subheader>{this.props.list.type}</Subheader>
                {items}
            </List>
        );
    }
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default class OverseerOverview extends React.Component
{
    constructor(props){
        super(props);

        this.state = {filter:""};
        
        this.OnFilterChange = this.OnFilterChange.bind(this);
    }


    OnFilterChange(event, newValue){
        this.setState({filter:newValue});
    }

    render(){
        return (
            <div className="OverseerOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap", padding: "20px 20px 20px 20px"}}>
                {/* <div style={{width:"100%", height:"10%"}} >
                    <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                </div> */}
                <div style={{width:"100%", height:"100%", overflow:"auto"}} >
                    <OverseerList
                        list={this.props.list}
                        filter={this.state.filter}
                        filterValue={this.state.filter}
                    />
                </div>
            </div>
        );
    }
}