import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';

import util from "../../Modules/util.js";
import {addNewImage as addNewImageBase64} from "../../Assets/images";

import uuid from "uuid";

class ImageThumb extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ImageThumb">
                <img src={this.props.src}/>
                    <div style={{margin:"10px", position:"relative", top:"-10px", display:(this.props.lang==="ru"?"initial":"none")}}><TextField hintText="Описание по рууски" defaultValue={this.props.description.ru} underlineShow={false}/></div>
                    <div style={{position:"relative", top:"-10px", display:(this.props.lang==="en"?"initial":"none")}}><TextField hintText="Описание на английском" defaultValue={this.props.description.en} underlineShow={false}/></div>
                <IconButton iconStyle={{color:"grey"}}><ActionDelete onClick={()=>{this.props.OnDelete(this.props.id)}}/></IconButton>
                <Divider />
            </div>
        );
    }
}

class ImageGallery extends React.Component
{

    constructor(props){
        super(props);
        props.RegCom(this);

        this.OnDragEnter = this.OnDragEnter.bind(this);
        this.OnDragOver = this.OnDragOver.bind(this);
        this.OnDrop = this.OnDrop.bind(this);
        this.OnFileSelected = this.OnFileSelected.bind(this);

        this.HandleFiles = this.HandleFiles.bind(this);
        this.AddImage = this.AddImage.bind(this);
        this.DeleteImage = this.DeleteImage.bind(this);
        this.ChangeDescription = this.ChangeDescription.bind(this);
        
        this.DropZone = null;
        this.fileUploadInput = null;

        var images = util.deepCopy(this.props.images).map((img)=>{
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

    AddImage(){
        alert(`OnAddImage`);
    }

    DeleteImage(id){
        var x = this.state.images.filter(i=>i.id!==id);
        this.setState({images:x});
    }

    ChangeDescription(){
        alert(`OnChangeDescription`);
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
        // var images = util.deepCopy(this.state.images);
        // images.push({src:addNewImageBase64, description:{ru:"Добавьте новое изображение, щелкнув на этой изображение", en:"Add new image, by tap this image"}});
        var imageThumbs = this.state.images.map(
            i=><ImageThumb key={i.id} src={i.src} lang={this.props.lang} description={i.description} id={i.id} OnDelete={this.DeleteImage}/>
        );
        return (
            <div className="ImageGallery">
                {/* <div style={{position:"fixed", width:"100%", height:"100%", top:"50%", margin:"auto", fontSize:"100px", zIndex:"0", color:"rgba(0,0,0,0.2)"}}>ЗАГРУЗИТЬ<br/>ФОТО</div> */}
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

import {connect} from "react-redux";
export default connect(s=>({images: s.draft.imageGallery.images, lang: s.exhibitCreator.language}))(ImageGallery);