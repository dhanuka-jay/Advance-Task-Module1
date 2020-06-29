/* Photo upload section */
import React, { Component } from 'react';
import { Icon, Image, Button } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            newFile: "",
            newFileUrl: "",
            uploadButton: false
        }
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    };

    uploadImage(e) {
        e.preventDefault();
        this.props.updateAndSaveData({ profilePhoto: null, profilePhotoUrl: null });
    }

    handleClick() {
        this.refs.photoInput.click();
    }

    fileSelectHandler(event) {
        //console.log(event.target.files[0]);
        event.preventDefault();
        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        let selectedFile = event.target.files[0];
        console.log(selectedFile);
        //if (this.state.newFile) {
        //    URL.revokeObjectURL(newFile);
        //}
        //console.log(this.state.newFile)
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({
                uploadButton: true,
                newFileUrl: URL.createObjectURL(event.target.files[0]),
                newFile: event.target.files[0]
            })
        }
    }

    fileUpload(e) {
        e.preventDefault();
        let file = this.state.newFile;
        console.log(file)
        const form = new FormData();
        form.append('file', file);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${process.env.SERVICE_PROFILE}/profile/profile/updateProfilePhoto`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            type: "POST",
            data: form,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    this.setState({
                        uploadButton: false
                    })
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        console.log(this.state.newFileUrl)
        //let photoUrl = this.props.photoUrl ? this.props.photoUrl : this.state.newFileUrl;
        let photoUrl = this.state.newFileUrl ? this.state.newFileUrl : this.props.photoUrl;
        return (
            <div className="ui sixteen wide column" style={{ textAlign: "center" }}>
                {photoUrl ?
                    <div>
                        <Image src={photoUrl}
                            style={{ height: 120, width: 120, borderRadius: 60 }}
                            className="ui small"
                            alt="Image Not Found"
                            centered
                            onClick={this.handleClick}
                        /> 
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            ref="photoInput"
                            onChange={this.fileSelectHandler}
                        />                        
                    </div>
                    :                    
                    <div>
                        <Icon
                            className="huge circular camera retro icon"
                            onClick={this.handleClick}
                        />
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            ref="photoInput"
                            onChange={this.fileSelectHandler}
                        />
                    </div>
                }
                {
                    this.state.uploadButton == true ?
                        <Button
                            size="medium"
                            color="black"
                            onClick={this.fileUpload}
                        ><Icon className="upload icon"></Icon>Upload</Button>
                        :
                        <React.Fragment></React.Fragment>
                }
            </div>
        )
    }
}
