/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import nextId from 'react-id-generator';
import { Table } from 'semantic-ui-react';
import AddSkill from './AddSkill.jsx';
import SkillItem from './SkillItem.jsx';
import UpdateSkill from './UpdateSkill.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        const data = Object.assign({}, this.props.skillData)

        this.state = {
            isAddSkill: false,
            isUpdateTrue: false,
            skillList: data,
            skillToUpdate: null,
            skillOptions: [
                {
                    key: 'Beginner',
                    text: 'Beginner',
                    value: 'Beginner',
                },
                {
                    key: 'Intermediate',
                    text: 'Intermediate',
                    value: 'Intermediate',
                },
                {
                    key: 'Expert',
                    text: 'Expert',
                    value: 'Expert',
                }
            ]
        }

        this.ViewSkillComponent = this.ViewSkillComponent.bind(this);
        this.toggleSkillCompnent = this.toggleSkillCompnent.bind(this);
        this.addNewSkill = this.addNewSkill.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.updateSelectedSkill = this.updateSelectedSkill.bind(this);
        this.makeUpdateFalse = this.makeUpdateFalse.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.skillList !== this.state.skillList) {
            this.props.updateProfileData({ skills: this.state.skillList })
        }
    }

    ViewSkillComponent(event) {
        event.preventDefault();
        //console.log(event.toElement.innerText);
        this.setState({
            isAddSkill: true
        });
    }

    toggleSkillCompnent(event, test) {
        event.preventDefault();
        //console.log(event.toElement.innerText);
        this.setState({
            isAddSkill: !this.state.isAddSkill
        });
    }

    addNewSkill(skill, level) {
        const skillItem = {
            id: nextId(),
            name: skill,
            level: level
        }

        this.setState({
            skillList: [...this.props.skillData, skillItem]
        })
    }

    updateItem(skillItem) {
        //console.log(lngItem, 'Main....');
        this.setState({
            skillToUpdate: skillItem,
            isUpdateTrue: true
        })
    }

    // Delete Language Row from List
    delItem(id) {
        this.setState({
            skillList: [...this.props.skillData.filter(skill => {
                return skill.id !== id
            })]
        });
        this.makeUpdateFalse();
    }

    updateSelectedSkill(newSkill, newLevel) {
        this.setState({
            skillList: this.props.skillData.map(skill => {
                if (skill.id === this.state.skillToUpdate.id) {
                    skill.name = newSkill,
                        skill.level = newLevel
                }
                return skill;
            })
        });
    }

    makeUpdateFalse() {
        this.setState({
            isUpdateTrue: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <AddSkill
                    toggleSkillCompnent={this.toggleSkillCompnent}
                    addNewSkill={this.addNewSkill}
                    isAddSkill={this.state.isAddSkill}
                    skillOptions={this.state.skillOptions}
                />
                <Table className="ui basic table">
                    <thead className="">
                        <tr className="">
                            <th className="five wide">Skill</th>
                            <th className="five wide">Level</th>
                            <th className="right aligned"><button className="ui icon left labeled black button" onClick={() => this.ViewSkillComponent(event)}><i className="plus icon"></i>Add New</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isUpdateTrue ?
                            <UpdateSkill
                                skillOptions={this.state.skillOptions}
                                skillToUpdate={this.state.skillToUpdate}
                                updateSelectedSkill={this.updateSelectedSkill}
                                makeUpdateFalse={this.makeUpdateFalse}
                            />
                            : <React.Fragment></React.Fragment>
                        }
                        {this.props.skillData.map(sklItm => (
                            <SkillItem key={sklItm.id}
                                sklItm={sklItm}
                                updateItem={this.updateItem}
                                delItem={this.delItem}
                                skillOptions={this.state.skillOptions}
                            />
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

