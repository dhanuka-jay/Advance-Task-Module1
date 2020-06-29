import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react'

export default class UpdateSkill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objectToUpdate: null,
            skill: '',
            skillLevel: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }

    componentDidMount() {
        if (this.state.objectToUpdate !== this.props.skillToUpdate) {
            this.setState({
                objectToUpdate: this.props.skillToUpdate,
                skill: this.props.skillToUpdate.name,
                skillLevel: this.props.skillToUpdate.level
            })
        }
    }

    componentDidUpdate() {
        if (this.state.objectToUpdate !== this.props.skillToUpdate) {
            this.setState({
                objectToUpdate: this.props.skillToUpdate,
                skill: this.props.skillToUpdate.skill,
                skillLevel: this.props.skillToUpdate.level
            })
        }
    }

    // Handle Dropdown Change Event
    handleChange(e, data) {
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

    // Update Language
    updateSkill(e) {
        e.preventDefault();
        this.props.updateSelectedSkill(this.state.skill, this.state.skillLevel);
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
                        className="skill"
                        value={this.state.skill}
                        onChange={this.handleInput}
                    />
                </td>
                <td>
                    <Dropdown
                        className="skillLevel"
                        onChange={this.handleChange}
                        placeholder='Skill Level'
                        floating
                        selection
                        options={this.props.skillOptions}
                        value={this.state.skillLevel}
                    />
                </td>
                <td style={{ float: 'left' }}>
                    <Button basic color='blue' onClick={this.updateSkill}>
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