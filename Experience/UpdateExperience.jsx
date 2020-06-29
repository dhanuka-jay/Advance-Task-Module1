import React from 'react';
import { TextArea, Button } from 'semantic-ui-react';
import nextId from 'react-id-generator';

export default class UpdateExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            company: '',
            position: '',
            start: '',
            end: '',
            responsibilities: '',
            experienceToEdit: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.experienceToEdit !== props.expToEdit) {
            return {
                id: props.expToEdit.id,
                company: props.expToEdit.company,
                position: props.expToEdit.position,
                start: `${new Date(props.expToEdit.start).getFullYear()}-${("0" + (new Date(props.expToEdit.start).getMonth() + 1)).slice(-2)}-${("0" + new Date(props.expToEdit.start).getDate()).slice(-2)}`,
                end: `${new Date(props.expToEdit.end).getFullYear()}-${("0" + (new Date(props.expToEdit.end).getMonth() + 1)).slice(-2)}-${("0" + new Date(props.expToEdit.end).getDate()).slice(-2)}`,
                responsibilities: props.expToEdit.responsibilities,
                experienceToEdit: props.expToEdit
            };
        }
        else {
            return state;
        }
    }

    handleOnChange(e) {
        this.setState({
            [e.target.className]: e.target.value
        })
    }

    handleOnUpdate(e) {
        e.preventDefault();

        const updatedExp = {
            id: this.state.id,
            company: this.state.company,
            position: this.state.position,
            start: new Date(this.state.start),
            end: new Date(this.state.end),
            responsibilities: this.state.responsibilities
        }

        this.props.updateExperience(updatedExp);

        // Clear Fields
        this.setState({
            company: '',
            position: '',
            start: '',
            end: '',
            responsibilities: ''
        })
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td colSpan='3' style={{ border: '0' }}>
                        <label>Company</label>
                        <input
                            className="company"
                            placeholder="Company"
                            onChange={this.handleOnChange}
                            value={this.state.company}
                        />
                    </td>
                    <td colSpan='3' style={{ border: '0' }}>
                        <label>Position</label>
                        <input
                            className="position"
                            placeholder="Position"
                            onChange={this.handleOnChange}
                            value={this.state.position}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan='3' style={{ border: '0' }}>
                        <label>Start Date</label>
                        <input
                            type="date"
                            className="start"
                            onChange={this.handleOnChange}
                            value={this.state.start}
                        />
                    </td>
                    <td colSpan='3' style={{ border: '0' }}>
                        <label>End Date</label>
                        <input
                            type="date"
                            className="end"
                            onChange={this.handleOnChange}
                            value={this.state.end}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan='3' style={{ border: '0' }}>
                        <label>Responsibilities</label>
                        <TextArea
                            className="responsibilities"
                            placeholder="Responsibilities"
                            onChange={this.handleOnChange}
                            value={this.state.responsibilities}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan='4' style={{ border: '0' }}>
                        <Button color="black" onClick={this.handleOnUpdate}>Update</Button>
                        <Button onClick={this.props.disableUpdateExperience}>Cancel</Button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}