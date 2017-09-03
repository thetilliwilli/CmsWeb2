import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

export default class ExhibitCard extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeImage = this.ChangeImage.bind(this);
        this.state = {imageSrc: this.props.imageHref};
    }

    ChangeImage(newSrc){
        this.setState({imageSrc: newSrc});
    }

    render() {
        return (
            <div className="ExhibitCard">
                <CardHeader  subtitle="КАРТОЧКА" />
                <TextField floatingLabelText="Название экспоната" />
                <UploadButton onFileChanged={this.ChangeImage}/>
                <br />
                <img className="ExhibitCard_image" src={this.state.imageSrc} style={{position:"relative", top:"0", left:"0", width:"100px", height:"100px", backgroundSize: "contain"}}/>
            </div>
        );
    }
}

ExhibitCard.defaultProps = {
    imageHref: "http://www.imasgrafica.com/images/nophotomaxi.jpg"
};

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    onFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onload = function (event) {
            self.props.onFileChanged(event.target.result);
        };

        reader.readAsDataURL(selectedFile);
    }

    render() {
        return (
            <RaisedButton className="ExhibitCard_upload" label="Choose an Image" labelPosition="before" style={{ verticalAlign: 'middle' }} containerElement="label">
                <input type="file" style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, }} onChange={this.onFileSelected} />
            </RaisedButton>
        );
    }
}