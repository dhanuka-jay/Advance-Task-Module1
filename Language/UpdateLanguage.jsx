import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react'

export default class UpdateLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objectToUpdate: null,
            language: '',
            languageLevel: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    componentDidMount() {
        if (this.state.objectToUpdate !== this.props.langToUpdate) {
            this.setState({
                objectToUpdate: this.props.langToUpdate,
                language: this.props.langToUpdate.name,
                languageLevel: this.props.langToUpdate.level
            })
        }
    }

    componentDidUpdate() {
        if (this.state.objectToUpdate !== this.props.langToUpdate) {
            this.setState({
                objectToUpdate: this.props.langToUpdate,
                language: this.props.langToUpdate.name,
                languageLevel: this.props.langToUpdate.level
            })
        }
    }

    // Handle Dropdown Change Event
    handleChange(e, data) {
        this.setState({
            languageLevel: data.value
        })
    }

    // Handle Input Change
    handleInput(e) {
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    // Update Language
    updateLanguage(e) {
        e.preventDefault();
        this.props.updateSelectedLanguage(this.state.language, this.state.languageLevel);
        this.props.makeUpdateFalse();
    }

    cancelUpdate(e) {
        e.preventDefault();
        this.props.makeUpdateFalse();
    }

    render() {
        //console.log(this.state.language, this.state.languageLevel)
            return (
                <tr>
                    <td>
                        <input
                            type="text"
                            className="language"
                            value={this.state.language}
                            onChange={this.handleInput}
                        />
                    </td>
                    <td>
                        <Dropdown
                            className="languageLevel"
                            onChange={this.handleChange}
                            placeholder='Language Level'
                            floating
                            selection
                            options={this.props.languageOptions}
                            value={this.state.languageLevel}
                        />
                    </td>
                    <td style={{ float: 'left' }}>
                        <Button basic color='blue' onClick={this.updateLanguage}>
                            Update
                        </Button>
                        <Button basic color='red' onClick={this.cancelUpdate}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            )
    }
}