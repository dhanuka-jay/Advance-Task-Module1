import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visaType: '',
            visaExpiryDate: ''
        }
        this.handleVisaTypes = this.handleVisaTypes.bind(this);
        this.handleVisaExpiryDate = this.handleVisaExpiryDate.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleVisaTypes(e,data) {
        this.setState({
            visaType: data.value
        })
    }

    handleVisaExpiryDate(e) {
        this.setState({
            [e.target.className]: e.target.value
        })
    }

    saveChanges(e) {
        e.preventDefault();
        this.props.updateProfileData({ visaStatus: this.state.visaType ? this.state.visaType : this.props.visaStatus, visaExpiryDate: this.state.visaExpiryDate ? this.state.visaExpiryDate : this.props.visaExpiryDate });
    }

    render() {
        const { visaExpiryDate, visaStatus } = this.props;
        const day = this.state.visaExpiryDate ? this.state.visaExpiryDate : visaExpiryDate ? `${new Date(visaExpiryDate).getFullYear()}-${("0" + (new Date(visaExpiryDate).getMonth() + 1)).slice(-2)}-${("0" + new Date(visaExpiryDate).getDate()).slice(-2)}` : '';
        const stats = this.state.visaType ? this.state.visaType : this.props.visaStatus;

        return (
            <React.Fragment>                
                <div className="six wide column">
                    <label>Visa Type</label>
                    <Dropdown
                        className="visaType"
                        placeholder="Visa Type"
                        labeled
                        fluid
                        selection
                        options={visaTypes}
                        value={stats}
                        onChange={this.handleVisaTypes}
                    />
                </div>
                {stats === 'Work Visa' || stats === 'Student Visa'?
                    <div className="six wide column">
                        <label>Visa expiry date</label>
                        <input
                            className="visaExpiryDate"
                            type="date"
                            onChange={this.handleVisaExpiryDate}
                            value={day}
                        />
                    </div>
                    :
                    <React.Fragment></React.Fragment>
                }
                <div className="four wide column">
                    <br />
                    <button className="ui black button" onClick={this.saveChanges}>Save</button>
                </div>
            </React.Fragment>
            )
    }
}

const visaTypes = [{
        key: 'Citizen',
        text: 'Citizen',
        value: 'Citizen',
    },
    {
        key: 'Permanent Resident',
        text: 'Permanent Resident',
        value: 'Permanent Resident',
    },
    {
        key: 'Work Visa',
        text: 'Work Visa',
        value: 'Work Visa',
    },
    {
        key: 'Student Visa',
        text: 'Student Visa',
        value: 'Student Visa',
    }
]