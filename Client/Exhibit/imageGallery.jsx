import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';

import util from "../Module/util.js";

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
            <div className="ImageThumb" style={{width:"100%", height:"13%", minHeight:"13%", display:"flex", flexWrap:"wrap", borderBottom:"1px solid lightgrey"}} >

                <div style={{width:"13%", height:"100%", display:"flex", padding:"4px"}} >
                    <img src={this.props.src} style={{width:"100%", height:"100%"}}/>
                </div>

                <div style={{width:"65%", height:"100%"}}>
                    <TextField
                        style={{display:(this.props.language==="ru"?"initial":"none")}}
                        name="ru" onChange={this.OnChange} hintText="Описание на русском" value={this.props.description.ru} underlineShow={false}
                    />
                    <TextField
                        style={{display:(this.props.language==="en"?"initial":"none")}}
                        name="en" onChange={this.OnChange} hintText="Описание на английском" value={this.props.description.en} underlineShow={false}
                    />
                </div>

                <div style={{width:"10%", height:"100%", display:"flex"}}>
                    <IconButton iconStyle={{color:"grey"}} style={{margin:"auto"}} onClick={()=>{this.props.OnDelete(this.props.id)}} ><ActionDelete /></IconButton>
                </div>

            </div>
        );
    }
}

const DndZoneReplacer = p => (
    <div style={{ fontSize:"2.5em", color:"lightgrey", margin:"auto", border:"2px dashed lightgrey", borderRadius:"10px", padding:"10px"}}>
        ПЕРЕНЕСИТЕ ФОТОГРАФИИ
    </div>
);

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
        //Освобождаем ресурсы занятой base64 изображениями
        for(var i in this.images)
            for(var j in this.images[i].a.d)
                this.images[i][j] = null;
        console.log("componentWillUnmount", "ImageGallery");
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
        var imageThumbs = this.state.images.map(
            i=><ImageThumb OnDescriptionChange={this.OnDescriptionChange} key={i.id} src={i.src} language={this.props.language} description={i.description} id={i.id} OnDelete={this.DeleteImage}/>
        );
        return (
            <div className="ImageGallery" style={{display:"flex", height:"100%", flexWrap:"wrap"}} >

                <div style={{width:"100%", height:"10%", display:"flex", flexWrap:"wrap", borderBottom:"1px solid lightgrey"}}>
                    <div style={{width:"40%"}} >
                        <CardHeader  subtitle="ФОТОГАЛЛЕРЕЯ" />
                    </div>

                    <div style={{width:"60%", display:"flex"}}>
                            <FlatButton
                                style={{width:"70%", borderRadius: "15px", color:"grey", pointer:"cursor",  margin:"auto", boxShadow:"0px 1px 3px 1px lightgrey"}}
                                icon={<ContentAdd/>} label="ЗАГРУЗИТЬ ЕЩЕ" containerElement="label">
                                <input ref={el=>this.fileUploadInput=el} type="file" style={{display:"none"}} multiple accept=".png,.jpg,.jpeg" onChange={this.OnFileSelected}/>
                            </FlatButton>
                    </div>
                </div>

                <div style={{width:"100%", height:"90%", display:"flex"}}>
                    <div className="DropZone" style={{width:"100%", height:"100%", overflow:"auto", display:"flex", flexDirection:"column"}} ref={el=>this.DropZone=el}>
                        {this.state.images.length === 0 ? <DndZoneReplacer/> : imageThumbs}
                    </div>
                </div>

                
            </div>
        );
    }
}