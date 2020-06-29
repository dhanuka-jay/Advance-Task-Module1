/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon, Grid } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const socialMedia = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: '',
                github: ''
            };

        this.state = {
            isEdit: false,
            socialMediaLinks: socialMedia
        }
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }


    openEdit() {
        this.props.objTag('socialMedia');
        const socialMedia = Object.assign({}, this.props.linkedAccounts);
        this.setState({
            isEdit: true,
            socialMediaLinks: socialMedia
        })
    }

    closeEdit() {
        this.props.objTag('');
        this.setState({
            isEdit: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.socialMediaLinks);
        data[event.target.name] = event.target.value;
        this.setState({
            socialMediaLinks: data
        })
    }

    saveChanges(e) {
        this.props.saveProfileData(this.state.socialMediaLinks);
        this.closeEdit();
    }

    render() {
        return (
            this.state.isEdit ? this.renderEdit() : this.renderDisplay()    
        )
    }

    renderDisplay() {
        return (
            <div className="row">
                <div className="three wide column">
                    <Button color='linkedin'>
                        <Icon name='linkedin' /> LinkedIn
                    </Button>
                </div>
                <div className="three wide column">
                    <Button color='black'>
                        <Icon name='github' /> github
                    </Button>
                </div>
                <div className="four wide column" />
                <div className="right floated two wide column">
                    <Button color='black' onClick={this.openEdit}>Edit</Button>
                </div>
            </div>    
        )
    }

    renderEdit() {
        return (
            <div className="row">
                <div className="sixteen wide column">
                    <div className="field">
                        <ChildSingleInput
                            inputType="text"
                            label="LinkedIn"
                            name="linkedIn"
                            value={this.state.socialMediaLinks.linkedIn}
                            controlFunc={this.handleChange}
                            maxLength={200}
                            placeholder="Enter your LinkedIn Url"
                            errorMessage="Please enter a valid LinkedIn Url"
                        />
                    </div>
                    <div className="field">
                        <ChildSingleInput
                            inputType="text"
                            label="GitHub"
                            name="github"
                            value={this.state.socialMediaLinks.github}
                            controlFunc={this.handleChange}
                            maxLength={200}
                            placeholder="Enter your GitHub Url"
                            errorMessage="Please enter a valid GitHub Url"
                        />
                    </div>
                    <button type="submit" className="ui black button" onClick={this.saveChanges}>Save</button>
                    <button className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div>
        )
    }    
}