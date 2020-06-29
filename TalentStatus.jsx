import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { isNullOrUndefined } from 'util';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobSeekStatus: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }

    handleChange(e, selected) {
        this.setState({
            jobSeekStatus: selected.value
        })
    }

    setInitialState() {
        //this.setState({
        //    jobSeekStatus: this.props.status
        //})
        console.log('test')
    }

    componentDidUpdate(prevProps, prevState) {

        let jobSeekStatus = {
            status: this.state.jobSeekStatus,
            availableDate : null
        }

        if (prevState.jobSeekStatus !== this.state.jobSeekStatus) {
            this.props.updateAndSaveData({ jobSeekingStatus: jobSeekStatus })
        }        
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ui sixteen wide column" style={{ textAlign: "left" }}>
                    <div className="row">
                        <Checkbox
                            radio
                            label='Actively looking for a job'
                            className='checkboxRadioGroup'
                            value='Actively looking for a job'
                            checked={this.props.jobStatus === 'Actively looking for a job'}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="row">
                        <Checkbox
                            radio
                            label='Not looking for a job at the moment'
                            className='checkboxRadioGroup'
                            value='Not looking for a job at the moment'
                            checked={this.props.jobStatus === 'Not looking for a job at the moment'}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="row">
                        <Checkbox
                            radio
                            label='Currently employed but open to offers'
                            className='checkboxRadioGroup'
                            value='Currently employed but open to offers'
                            checked={this.props.jobStatus === 'Currently employed but open to offers'}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="row">
                        <Checkbox
                            radio
                            label='Will be available on later date'
                            className='checkboxRadioGroup'
                            value='Will be available on later date'
                            checked={this.props.jobStatus === 'Will be available on later date'}
                            onChange={this.handleChange}
                        /> 
                    </div>
                </div>
            </React.Fragment>
        )
    }
}