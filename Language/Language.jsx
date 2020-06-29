/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Table } from 'semantic-ui-react';
import ReactDOMServer from 'react-dom/server';
import nextId from 'react-id-generator';
import AddLanguage from './AddLanguage.jsx';
import LanguageItem from './LanguageItem.jsx';
import UpdateLanguage from './UpdateLanguage.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const data = Object.assign({}, this.props.languageData)

        this.state = {
            isAddLanguage: false,
            isUpdateTrue: false,
            languageList: data,
            langToUpdate : null,
            languageOptions : [
                {
                    key: 'Basic',
                    text: 'Basic',
                    value: 'Basic',
                },
                {
                    key: 'Conversational',
                    text: 'Conversational',
                    value: 'Conversational',
                },
                {
                    key: 'Fluent',
                    text: 'Fluent',
                    value: 'Fluent',
                },
                {
                    key: 'Native/Bilingual',
                    text: 'Native/Bilingual',
                    value: 'Native/Bilingual',
                },
            ]
        }

        this.ViewLangugateComponent = this.ViewLangugateComponent.bind(this);
        this.toggleLanguageCompnent = this.toggleLanguageCompnent.bind(this);
        this.addNewLanguage = this.addNewLanguage.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
        this.makeUpdateFalse = this.makeUpdateFalse.bind(this);
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.languageList !== this.state.languageList) {
            this.props.updateProfileData({ languages: this.state.languageList })
        }
    }

    ViewLangugateComponent(event) {
        event.preventDefault();
        //console.log(event.toElement.innerText);
        this.setState({
            isAddLanguage: true
        });
    }

    toggleLanguageCompnent(event, test) {
        event.preventDefault();
        //console.log(event.toElement.innerText);
        this.setState({
            isAddLanguage: !this.state.isAddLanguage
        });
    }

    addNewLanguage(language, level) {
        const languageItem = {
            id: nextId(),
            name: language,
            level: level
        }

        this.setState({
            languageList: [...this.props.languageData, languageItem]
        })
        //console.log(this.state.languageList)
    }

    updateItem(lngItem) {
        //console.log(lngItem, 'Main....');
        this.setState({
            langToUpdate: lngItem,
            isUpdateTrue: true
        })
    }

    // Delete Language Row from List
    delItem(id) {
        this.setState({
            languageList: [...this.props.languageData.filter(language => {
                return language.id !== id
            })]
        });
        this.makeUpdateFalse();
    }

    updateSelectedLanguage(newLanguage, newLevel) {
        this.setState({
            languageList: this.props.languageData.map(lng => {
                if (lng.id === this.state.langToUpdate.id) {
                    lng.name = newLanguage,
                        lng.level = newLevel
                }
                return lng;
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
                    <AddLanguage
                        toggleLanguageCompnent={this.toggleLanguageCompnent}
                        addNewLanguage={this.addNewLanguage}
                        isAddLanguage={this.state.isAddLanguage}
                        languageOptions={this.state.languageOptions}
                    />
                    <Table className="ui basic table">
                        <thead className="">
                            <tr className="">
                                <th className="five wide">Language</th>
                                <th className="five wide">Level</th>
                                <th className="right aligned"><button className="ui icon left labeled black button" onClick={() => this.ViewLangugateComponent(event)}><i className="plus icon"></i>Add New</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isUpdateTrue ?
                                <UpdateLanguage
                                    languageOptions={this.state.languageOptions}
                                    langToUpdate={this.state.langToUpdate}
                                    updateSelectedLanguage={this.updateSelectedLanguage}
                                    makeUpdateFalse={this.makeUpdateFalse}
                                />
                                : <React.Fragment></React.Fragment>
                            }
                            {this.props.languageData.map(lngItm => (
                                <LanguageItem key={lngItm.id}
                                    lngItm={lngItm}
                                    updateItem={this.updateItem}
                                    delItem={this.delItem}
                                    languageOptions={this.state.languageOptions}
                                />
                            ))}
                        </tbody>
                    </Table>
                </React.Fragment>
            )
        }
}