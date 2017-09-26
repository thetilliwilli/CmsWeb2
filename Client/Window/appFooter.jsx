import React from 'react';
import {withRouter} from "react-router-dom";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">NEW</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">OVERVIEW</FontIcon>;
const mockupNew = <FontIcon className="material-icons">EDIT</FontIcon>;
const mockupOverview = <FontIcon className="material-icons">MOCKUP</FontIcon>;

const contents = [
    "/ExhibitCreatorPage",
    "/ExhibitOverview",
    "/ExhibitEdit",
    "/ExhibitMockupOverviewPage"
];

class AppFooter extends React.Component
{
    constructor(props){
        super(props);
        this.Select = this.Select.bind(this);
    }

    Select(index){
        this.props.history.push(contents[index]);//Меняем страницу
        this.props.InvokeChangePage(index);
    }

    render(){
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.props.selectedIndex}>
                    <BottomNavigationItem label="Создать экспонат" icon={recentsIcon} onClick={() => this.Select(0)} />
                    <BottomNavigationItem label="Обзор экспонатов" icon={favoritesIcon} onClick={() => this.Select(1)} />
                    <BottomNavigationItem label="Редактировать&nbsp;экспонат" icon={mockupNew} onClick={() => this.Select(2)} />
                    {/* <BottomNavigationItem label="Выбрать шаблон" icon={mockupOverview} onClick={() => this.Select(3)} /> */}
                </BottomNavigation>
            </Paper>
        );
    }
}
//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import {ChangePage} from "../App/ac.js";
const MapStateToProps = (state)=>{ return {selectedIndex: state.page}; };
const MapDispatchToProps = (dispatch)=>{
    return {
        InvokeChangePage: (index)=>{
            dispatch(ChangePage(index))
        }
    };
}
export default connect(MapStateToProps, MapDispatchToProps)(withRouter(AppFooter));