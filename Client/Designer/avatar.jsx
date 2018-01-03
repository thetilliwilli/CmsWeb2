import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";
import WithImageViewer from "../Component/withImageViewer.jsx";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);

        this.OnFileSelected = this.OnFileSelected.bind(this);
        this.OnImageClick = this.OnImageClick.bind(this);

        this.fileUploadInput = null;
    }

    OnFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onload = function (event) {
            self.props.onFileChanged(event.target.result);
        };

        reader.readAsDataURL(selectedFile);
    }

    OnImageClick(){
        this.fileUploadInput.click();
    }

    render() {
        const imageSrc = this.props.imageSrc || DEFAULT_IMAGE_AVATAR;
        return (
            <div>
                <img className="ExhibitCard_image" onClick={this.OnImageClick} src={imageSrc}
                    onContextMenu={e=>this.props.ImageViewerShow(e,imageSrc)}
                    style={{marginLeft:"16px", boxShadow:"0px 0px 2px 0px grey" , maxWidth:"100px", maxHeight:"100px", backgroundSize: "contain", cursor: 'pointer'}}/>
                <input ref={(input)=>{this.fileUploadInput = input;}} type="file"
                    style={{display:"none"}} onChange={this.OnFileSelected} accept=".png,.jpg,.jpeg" />
            </div>
        );
    }
}
const UploadImageAdv = WithImageViewer(UploadImage);

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        props.RegCom(this);
        
        this.ChangeImage = this.ChangeImage.bind(this);
        this.state = {imageSrc: props.imageHref};
    }

    ChangeImage(newSrc){
        this.setState({imageSrc: newSrc});
    }

    Data(){ return {src: this.state.imageSrc} }

    render() {
        return (
            <div className="ExhibitCard">
                <CardHeader  subtitle="КАРТОЧКА" style={{padding:"6px 16px 6px 16px"}} />
                <UploadImageAdv onFileChanged={this.ChangeImage} imageSrc={this.state.imageSrc}/>
            </div>
        );
    }
}