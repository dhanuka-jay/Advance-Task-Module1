import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Table, Dropdown } from 'semantic-ui-react';

export default class AddSkill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: '',
            skillLevel: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    // Handle Add Button Event
    handleAdd(e) {
        e.preventDefault();
        this.props.addNewSkill(this.state.skill, this.state.skillLevel);

        //Clear Fields;
        this.setState({
            skill: '',
            skillLevel: ''
        });

    }

    // Handle Dropdown Change Event
    handleChange(e, data) {
        //console.log(data.value);
        this.setState({
            skillLevel: data.value
        })
    }

    // Handle Input Change
    handleInput(e) {
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    render() {
        if (this.props.isAddSkill) {
            return (
                <div className="row">
                    <div className="five wide column">
                        <div className="field">
                            <input
                                onChange={this.handleInput}
                                placeholder="Add Skill"
                                className="skill"
                                value={this.state.skill}
                            />
                        </div>
                    </div>
                    <div className="five wide column">
                        <Dropdown
                            className="skillLevel"
                            onChange={this.handleChange}
                            placeholder='Skill Level'
                            fluid
                            selection
                            value={this.state.skillLevel}
                            options={this.props.skillOptions}
                        />
                    </div>
                    <div className="six wide column">
                        <div>
                            <button className="ui black button" onClick={this.handleAdd}>Add</button>
                            <button className="ui button" onClick={this.props.toggleSkillCompnent}>Cancel</button>
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