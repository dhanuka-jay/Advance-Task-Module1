import React from 'react';
import { TextArea, Button } from 'semantic-ui-react';
import nextId from 'react-id-generator';

export default class AddExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            position: '',
            start: '',
            end: '',
            responsibilities: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnAdd = this.handleOnAdd.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.className]: e.target.value
        })
    }

    handleOnAdd(e) {
        e.preventDefault();

        const exp = {
            id: nextId(),
            company: this.state.company,
            position: this.state.position,
            start: new Date(this.state.start),
            end: new Date(this.state.end),
            responsibilities: this.state.responsibilities
        }

        this.props.addExperienceToList(exp);

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
                <div className="row">
                    <div className="eight wide column">
                        <label>Company</label>
                        <input
                            className="company"
                            placeholder="Company"
                            onChange={this.handleOnChange}
                            value={this.state.company}
                        />
                    </div>
                    <div className="eight wide column">
                        <label>Position</label>
                        <input
                            className="position"
                            placeholder="Position"
                            onChange={this.handleOnChange}
                            value={this.state.position}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        <label>Start Date</label>
                        <input
                            type="date"
                            className="start"
                            onChange={this.handleOnChange}
                            value={this.state.start}
                        />
                    </div>
                    <div className="eight wide column">
                        <label>End Date</label>
                        <input
                            type="date"
                            className="end"
                            onChange={this.handleOnChange}
                            value={this.state.end}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide column">
                        <label>Responsibilities</label>
                        <TextArea
                            className="responsibilities"
                            placeholder="Responsibilities"
                            onChange={this.handleOnChange}
                            value={this.state.responsibilities}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Button color="black" onClick={this.handleOnAdd}>Add</Button>
                        <Button onClick={this.props.disableAddExperience}>Cancel</Button>
                    </div>
                </div>
            </React.Fragment>
            );
    }
}