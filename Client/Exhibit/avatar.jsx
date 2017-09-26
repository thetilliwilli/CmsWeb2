import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

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
                <CardHeader  subtitle="КАРТОЧКА" />
                <UploadImage onFileChanged={this.ChangeImage} imageSrc={this.state.imageSrc}/>
            </div>
        );
    }
}

// Avatar.defaultProps = {
//     imageHref: "/static/img/defaultExhibitAvatar.jpg"
// };

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
        return (
            <div>
                <img className="ExhibitCard_image" onClick={this.OnImageClick} src={this.props.imageSrc} style={{position:"relative", top:"0", left:"0", width:"100px", height:"100px", backgroundSize: "contain"}}/>
                <input ref={(input)=>{this.fileUploadInput = input;}} type="file" style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, }} onChange={this.OnFileSelected} accept=".png,.jpg,.jpeg" />
            </div>
        );
    }
}