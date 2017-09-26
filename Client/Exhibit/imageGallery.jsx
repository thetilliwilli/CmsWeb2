import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';

import util from "../Modules/util.js";

import uuid from "uuid";

class ImageThumb extends React.Component
{
    constructor(props){
        super(props);

        this.OnChange = this.OnChange.bind(this);
    }

    OnChange(event, newValue){
        this.props.OnDescriptionChange(this.props.id, event.target.name, newValue);
    }

    render(){
        return (
            <div className="ImageThumb">
                <img src={this.props.src}/>
                    <div style={{margin:"10px", position:"relative", top:"-10px", display:(this.props.language==="ru"?"initial":"none")}}>
                        <TextField name="ru" onChange={this.OnChange} hintText="Описание на русском" value={this.props.description.ru} underlineShow={false}/>
                    </div>
                    <div style={{position:"relative", top:"-10px", display:(this.props.language==="en"?"initial":"none")}}>
                        <TextField name="en" onChange={this.OnChange} hintText="Описание на английском" value={this.props.description.en} underlineShow={false}/>
                    </div>
                <IconButton iconStyle={{color:"grey"}}><ActionDelete onClick={()=>{this.props.OnDelete(this.props.id)}}/></IconButton>
                <Divider />
            </div>
        );
    }
}

export default class ImageGallery extends React.Component
{

    constructor(props){
        super(props);
        props.RegCom(this);

        this.OnDragEnter = this.OnDragEnter.bind(this);
        this.OnDragOver = this.OnDragOver.bind(this);
        this.OnDrop = this.OnDrop.bind(this);
        this.OnFileSelected = this.OnFileSelected.bind(this);

        this.HandleFiles = this.HandleFiles.bind(this);
        this.DeleteImage = this.DeleteImage.bind(this);

        this.OnDescriptionChange = this.OnDescriptionChange.bind(this);

        this.DropZone = null;
        this.fileUploadInput = null;

        var images = util.DeepCopy(props.images);
        images.forEach((img)=>{
            if(!img.id)
                img.id = uuid();
        });

        this.state = {images};
    }

    componentDidMount(){
        this.DropZone.addEventListener("dragenter", this.OnDragEnter);
        this.DropZone.addEventListener("dragover", this.OnDragOver);
        this.DropZone.addEventListener("drop", this.OnDrop);
    }

    componentWillUnmount(){
        this.DropZone.removeEventListener("dragenter", this.OnDragEnter);
        this.DropZone.removeEventListener("dragover", this.OnDragOver);
        this.DropZone.removeEventListener("drop", this.OnDrop);
    }

    //HANDLERS-------------------------------------
    PreventDefaultBehaviour(event){
        event.stopPropagation();
        event.preventDefault();
    }

    OnDragEnter(event){ this.PreventDefaultBehaviour(event); }
    
    OnDragOver(event){ this.PreventDefaultBehaviour(event); }

    OnDrop(event){
        this.PreventDefaultBehaviour(event);
        this.HandleFiles(event.dataTransfer.files);
    }

    OnFileSelected(event) { this.HandleFiles(event.target.files); }

    Data(){ return this.state.images; }

    OnDescriptionChange(id, lang, data){
        var newState = util.DeepCopy(this.state);
        newState.images.find(i => i.id===id).description[lang] = data;
        this.setState(newState);
    }
    
    //METHODS-------------------------------------
    HandleFiles(files){
        var images = this.state.images.slice();
        let self = this;
        Array.prototype.forEach.call(files, (file)=>{
            let newId = uuid();
            var newImage = {src:"/Static/img/spinner.gif", description:{ru:"", en:""}, id:newId};
            images.push(newImage);
            var fileReader = new FileReader();
            fileReader.onload = (event)=>{
                var updatedImage = self.state.images.find(i=>i.id===newId);
                updatedImage.src = event.target.result;
                // self.setState({});
                self.forceUpdate();
            };
            fileReader.readAsDataURL(file);
        });
        this.setState({images});
    }

    DeleteImage(id){
        var x = this.state.images.filter(i=>i.id!==id);
        this.setState({images:x});
    }

    render(){
        const inputStyle = {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
          };
        const dropZoneStyle = {border:"1px solid lightgrey", height:"100%", minHeight:"400px", overflow:"auto"};
        var imageThumbs = this.state.images.map(
            i=><ImageThumb OnDescriptionChange={this.OnDescriptionChange} key={i.id} src={i.src} language={this.props.language} description={i.description} id={i.id} OnDelete={this.DeleteImage}/>
        );
        return (
            <div className="ImageGallery">
                <CardHeader  subtitle="ФОТОГАЛЛЕРЕЯ" />
                
                <FlatButton style={{color:"grey"}} icon={<ContentAdd/>} label="ЗАГРУЗИТЬ ЕЩЕ" fullWidth containerElement="label">
                    <input ref={el=>this.fileUploadInput=el} type="file" style={inputStyle} multiple accept=".png,.jpg,.jpeg" onChange={this.OnFileSelected}/>
                </FlatButton>

                <div className="DropZone" ref={el=>this.DropZone=el} style={dropZoneStyle}>
                    {imageThumbs}
                </div>
            </div>
        );
    }
}