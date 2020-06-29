import React from 'react';
import Cookies from 'js-cookie';

export default class DescriptionSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: 0
        };
        this.update = this.update.bind(this);
    };

    update(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.props.updateStateData(data);
        let description = event.target.value;
        this.setState({
            characters: description.length
        })
    }

    render() {
        const characterLimit = 150;
        let characters = this.props.description ? this.props.description.length : 0;

        return (
            <React.Fragment>                
                <div className="four wide column">
                    <h3>Description</h3>
                </div>
                <div className="twelve wide column">
                    <div className="field" >
                        <input placeholder="Please provide a short summary about yourself." />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="Description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.props.description} onChange={this.update} ></textarea>
                    </div>
                    <p>Characters remaining : {characters} / {characterLimit}</p>
                    <button className="ui right floated black button">Save</button>
                </div>                
            </React.Fragment>
        )
    }
}
