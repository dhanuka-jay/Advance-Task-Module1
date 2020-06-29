import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Table, Dropdown } from 'semantic-ui-react';

export default class AddLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            languageLevel: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    // Handle Add Button Event
    handleAdd(e) {
        e.preventDefault();
        this.props.addNewLanguage(this.state.language, this.state.languageLevel);

        //Clear Fields;
        this.setState({
            language: '',
            languageLevel: ''
        });
        
    }

    // Handle Dropdown Change Event
    handleChange(e, data) {
        //console.log(data.value);
        this.setState({
            languageLevel : data.value
        })
    }

    // Handle Input Change
    handleInput(e) {
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    render() {
        //console.log(this.props.isAddLanguage);

        //const languageOptions = [
        //    {
        //        key: 'Basic',
        //        text: 'Basic',
        //        value: 'Basic',
        //    },
        //    {
        //        key: 'Conversational',
        //        text: 'Conversational',
        //        value: 'Conversational',
        //    },
        //    {
        //        key: 'Fluent',
        //        text: 'Fluent',
        //        value: 'Fluent',
        //    },
        //    {
        //        key: 'Native/Bilingual',
        //        text: 'Native/Bilingual',
        //        value: 'Native/Bilingual',
        //    },
        //];

        if (this.props.isAddLanguage) {
            return (
                <div className="row">
                    <div className="five wide column">
                        <div className="field">
                            <input
                                onChange={this.handleInput}
                                placeholder="AddLanguage"
                                className="language"
                                value={this.state.language}
                        />
                        </div>
                    </div>
                    <div className="five wide column">
                        <Dropdown
                            className="languageLevel"
                            onChange={this.handleChange}
                            placeholder='Language Level'
                            fluid
                            selection
                            value={this.state.languageLevel}
                            options={this.props.languageOptions}
                        />
                    </div>
                    <div className="six wide column">
                        <div>
                            <button className="ui black button" onClick={this.handleAdd}>Add</button>
                            <button className="ui button" onClick={this.props.toggleLanguageCompnent}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}