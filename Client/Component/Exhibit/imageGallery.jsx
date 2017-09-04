import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import util from "../../Modules/util.js";
import {addNewImage as addNewImageBase64} from "../../Assets/images";

// const SelectImagesButton = ()=>{
//     const inputStyle={cursor: 'pointer',position: 'absolute',top: 0,bottom: 0,right: 0,left: 0,width: '100%',opacity: 0,};
//     return (
//         <RaisedButton label="Выбрать" labelPosition="before" containerElement="label">
//             <input type="file" style={inputStyle} />
//         </RaisedButton>  
//     );
// };

class ImageThumb extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ImageThumb">
                <img src={this.props.src} width={70} height={70}/>
                <div style={{display:(this.props.lang==="ru"?"initial":"none")}}><TextField hintText="Описание по рууски" defaultValue={this.props.description.ru} /></div>
                <div style={{display:(this.props.lang==="en"?"initial":"none")}}><TextField hintText="Описание на английском" defaultValue={this.props.description.en} /></div>
                <IconButton><ActionDelete onClick={()=>{this.props.OnDelete(this.props.data.id)}}/></IconButton>
                <Divider />
            </div>
        );
    }
}

class ImageGallery extends React.Component
{

    constructor(props){
        super(props);

        this.DragEnter = this.DragEnter.bind(this);
        this.DragOver = this.DragOver.bind(this);
        this.Drop = this.Drop.bind(this);

        this.HandleFiles = this.HandleFiles.bind(this);
        this.AddImage = this.AddImage.bind(this);
        this.DeleteImage = this.DeleteImage.bind(this);
        this.ChangeDescription = this.ChangeDescription.bind(this);
        
        this.DropZone = null;
        
        var images = util.deepCopy(this.props.images);
        images.push({src:addNewImageBase64, description:{ru:"Добавьте новое изображение, щелкнув на этой изображение", en:"Add new image, by tap this image"}});

        this.state = {images};
    }

    componentDidMount(){
        this.DropZone.addEventListener("dragenter", this.DragEnter);
        this.DropZone.addEventListener("dragover", this.DragOver);
        this.DropZone.addEventListener("drop", this.Drop);
    }

    //EVENTS-------------------------------------
    DragEnter(event){
        event.stopPropagation();
        event.preventDefault();
    }

    DragOver(event){
        event.stopPropagation();
        event.preventDefault();
    }

    Drop(event){
        event.stopPropagation();
        event.preventDefault();

        var files = event.dataTransfer.files;

        this.props.HandleFiles(files);
    }

    //FILES-------------------------------------
    HandleFiles(files){
        console.log(files);
    }

    AddImage(){
        alert(`OnAddImage`);
    }

    DeleteImage(imageId){
        alert(`OnDeleteImage`);
    }

    ChangeDescription(){
        alert(`OnChangeDescription`);
    }

    render(){
        const dropZoneStyle = {border:"1px solid grey", height:"100%", minHeight:"400px"};
        var imageThumbs = this.props.images.map(
            i=><ImageThumb key={i.src} src={i.src} lang={this.props.lang} description={i.description}/>
        );
        return (
            <div className="ImageGallery">
                <CardHeader  subtitle="ФОТОГАЛЛЕРЕЯ" />
                
                <div className="DropZone" ref={el=>this.DropZone=el} style={dropZoneStyle}>
                    {imageThumbs}
                </div>

            </div>
        );
    }
}

import {connect} from "react-redux";
export default connect(s=>({images: s.draftExhibit.imageGallery.images, lang: s.exhibitCreator.language}))(ImageGallery);