/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { TextArea, Button, Table } from 'semantic-ui-react';
import AddExperience from './AddExperience.jsx';
import ExperienceList from './ExperienceList.jsx';
import UpdateExperience from './UpdateExperience.jsx';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        const exp = Object.assign({}, this.props.experienceData)

        this.state = {
            isAddEnable: false,
            isUpdateEnable: false,
            expToEdit: null,
            experienceList: exp
        }
        this.addExperienceToList = this.addExperienceToList.bind(this);
        this.enableAddExperience = this.enableAddExperience.bind(this);
        this.disableAddExperience = this.disableAddExperience.bind(this);
        this.enableUpdateExperience = this.enableUpdateExperience.bind(this);
        this.disableUpdateExperience = this.disableUpdateExperience.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.deleteExperience = this.deleteExperience.bind(this);
        this.editItem = this.editItem.bind(this);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.experienceList !== this.state.experienceList) {
            this.props.updateProfileData({ experience: this.state.experienceList })
        }
    }

    enableAddExperience(e) {
        e.preventDefault();

        this.setState({
            isAddEnable: true
        })
    }

    disableAddExperience() {
        this.setState({
            isAddEnable: false
        })
    }

    enableUpdateExperience() {
        this.setState({
            isUpdateEnable: true
        })
    }

    disableUpdateExperience() {
        this.setState({
            isUpdateEnable: false
        })
    }

    addExperienceToList(exp) {
        this.setState({
            experienceList: [...this.props.experienceData, exp],
        });
        this.disableAddExperience();
    }

    updateExperience(updatedExp) {
        this.setState({
            experienceList: this.props.experienceData.map(exp => {
                if (updatedExp.id === exp.id) {
                    exp.company = updatedExp.company,
                        exp.position = updatedExp.position,
                        exp.start = updatedExp.start,
                        exp.end = updatedExp.end,
                        exp.responsibilities = updatedExp.responsibilities
                }
                return exp;
            })
        });

        this.disableUpdateExperience();
    }

    editItem(id) {
        this.props.experienceData.map(exp => {
            if (exp.id === id) {
                this.setState({
                    expToEdit: exp
                })
            }
        });

        this.enableUpdateExperience();
    }

    deleteExperience(delExp) {
        this.setState({
            experienceList: [...this.props.experienceData.filter(exp => 
                delExp.id !== exp.id
                )]
        })
    }
    
    render() {
        return (
            <React.Fragment>
                {this.state.isAddEnable ?
                    <AddExperience
                        addExperienceToList={this.addExperienceToList}
                        disableAddExperience={this.disableAddExperience}
                    />
                    :
                    <React.Fragment></React.Fragment>
                }
                <Table className="ui basic table">
                    <thead>
                        <tr>
                            <th className="two wide">Company</th>
                            <th className="two wide">Position</th>
                            <th className="four wide">Responsibilities</th>
                            <th className="three wide">Start</th>
                            <th className="three wide">End</th>
                            <th className="two wide right aligned "><button className="ui icon left labeled black button" onClick={this.enableAddExperience}><i className="plus icon"></i>Add New</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isUpdateEnable ?
                            <UpdateExperience
                                expToEdit={this.state.expToEdit}
                                updateExperience={this.updateExperience}
                                disableUpdateExperience={this.disableUpdateExperience}
                            />
                            :
                            <React.Fragment></React.Fragment>
                        }
                        {this.props.experienceData.map(experience => (
                            <ExperienceList
                                key={experience.id}
                                experience={experience}
                                editItem={this.editItem}
                                deleteExperience={this.deleteExperience}
                            />
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
            )
    }
}
