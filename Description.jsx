import React from 'react';
import Cookies from 'js-cookie';

export class Description extends React.Component {

    constructor(props) {
        super(props);
        const dscr = this.props.userDescription ?
            Object.assign({}, this.props.userDescription)
            : {
                summary: '',
                description: ''
            };

        this.state = {
            characters: 0,
            isEdit: false,
            descriptionSummary: dscr
        };
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);      
    };

    openEdit() {
        const data = Object.assign({}, this.props.userDescription);
        this.setState({
            descriptionSummary: data,
            isEdit: true
        })
    }

    closeEdit() {
        this.setState({
            isEdit: false
        })
    }

    update(event) {
        //let data = {};
        //data[event.target.className] = event.target.value;
        let data = Object.assign({}, this.state.descriptionSummary)
        data[event.target.className] = event.target.value
        this.setState({
            descriptionSummary: data
        })
        //this.props.updateStateData(data);
        let description = event.target.value;
        this.setState({
            characters: description.length
        })
    }

    save(event) {
        event.preventDefault();
        this.props.saveData(this.state.descriptionSummary);
        this.closeEdit();
    }

    //setValues() {
    //    const data = Object.assign({}, this.props.userDescription);
    //    this.setState({
    //        descriptionSummary: data
    //    })
    //}

    render() {
        return (
            this.state.isEdit ? this.renderEdit() : this.renderDisplay()
            )
    }

    renderDisplay() {
        let summary = this.props.userDescription.summary ? this.props.userDescription.summary : ''
        let description = this.props.userDescription.description ? this.props.userDescription.description : ''

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Summary: {summary}</p>
                        <p>Description: {description}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    renderEdit() {
        const descCharLimitMax = 600;
        const descCharLimitMin = 150;
        const smrCharLimitMax = 150;
        //let characters = this.props.description ? this.props.description.length : 0;

        return (
            <div className="row">
                <div className="sixteen wide column">
                    <div className="field" >
                        <input
                            placeholder="Please provide a short summary about yourself."
                            maxLength={smrCharLimitMax}
                            className="summary"
                            onChange={this.update}
                            value={this.state.descriptionSummary.summary ? this.state.descriptionSummary.summary : ''}
                        />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>
                    <div className="field" >
                        <textarea
                            maxLength={descCharLimitMax}
                            minLength={descCharLimitMin}
                            className="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.state.descriptionSummary.description ? this.state.descriptionSummary.description : ''}
                            onChange={this.update} >
                        </textarea>
                    </div>
                    <p>Description must be between 150-600 characters.</p>
                    {/* <p>Characters remaining : {characters} / {characterLimit}</p> */}
                    <button
                        className="ui black button"
                        onClick={this.save}
                    >Save
                    </button>
                    <button className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div>
        )
    }
}
