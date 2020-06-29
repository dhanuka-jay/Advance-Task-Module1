import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language/Language.jsx';
import Skill from './Skill/Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience/Experience.jsx';
import DescriptionSummary from './DescriptionSummary.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';
import { Description } from './Description.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                description: '',
                summary:'',
                individualDetails: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: ""
                },
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
                profilePhotoUrl: '',
                linkedAccounts: {},
                jobSeekingStatus: {}
            },
            loaderData: loaderData,
            objectTag: '',
            shouldUpdate: false
        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.updateAndSaveObjectData = this.updateAndSaveObjectData.bind(this)
        this.setObjTag = this.setObjTag.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
    };

    setObjTag(tagValue) {
        this.setState({
            objectTag: tagValue
        })
    }

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    //componentDidUpdate(prevProps, prevState) {
    //    if (this.state.shouldUpdate) {
    //        console.log('cdu ran...')
    //        this.loadData();
    //    }        
    //}

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${process.env.SERVICE_PROFILE}/profile/profile/getTalentProfile`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(`get-result: ${res.data}`)
                this.updateWithoutSave(res.data)
            }.bind(this),
            error: function (res) {
                console.log(`Error: ${res}`)
            }
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    updateAndSaveObjectData(newValues) {
        let newState = Object.assign({}, this.state.profileData)
        if (this.state.objectTag === 'address') {
            newState.address = newValues;
        }else if (this.state.objectTag === 'socialMedia') {
            newState.linkedAccounts = newValues;
        }
        
        this.setState({
            profileData: newState
        },this.saveProfile);
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        //console.log('AP :'||newValues);
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile,
        }, this.saveProfile); 
    }

    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
    }

    saveProfile() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${process.env.SERVICE_PROFILE}/profile/profile/updateTalentProfile`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })  
    }

    render() {

        let status = this.state.profileData.jobSeekingStatus ? this.state.profileData.jobSeekingStatus.status : '';
        
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }

        const userDescription = {
            description: this.state.profileData.description,
            summary: this.state.profileData.summary
        }

        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileData.linkedAccounts}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveObjectData}
                                                objTag={this.setObjTag}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Description'
                                        >
                                            <Description
                                                userDescription={userDescription}
                                                saveData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                addressData={this.state.profileData.address}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveObjectData}
                                                objTag={this.setObjTag}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select Your Nationality'
                                        >
                                            <Nationality
                                                nationality={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Language'
                                            tooltip='Select Your Language'
                                        >
                                            <Language
                                                languageData={this.state.profileData.languages}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List Your Skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileData.skills}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work Experience'
                                            tooltip='Add Your Work Experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileData.experience}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                updateProfileData={this.updateAndSaveData}
                                                visaStatus={this.state.profileData.visaStatus}
                                                visaExpiryDate={this.state.profileData.visaExpiryDate}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                updateAndSaveData={this.updateAndSaveData}
                                                jobStatus={status}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip=''
                                        >
                                            <PhotoUpload
                                                updateAndSaveData={this.updateAndSaveData}
                                                photoUrl={this.state.profileData.profilePhotoUrl}
                                            />
                                        </FormItemWrapper>
                                        <div>
                                            <input type="button" className="ui teal button right floated" onClick={this.saveProfile} value="Save"></input>
                                        </div>
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
