import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const addressDetails = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                country: "",
                city: "",
                postCode: ""
            }


        this.state = {
            showEdit: false,
            newAddress: addressDetails
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress);
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    handleSelectChange(event) {
        const data = Object.assign({}, this.state.newAddress);
        data[event.target.className] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    removeDuplicates(arr) {
        return arr.filter((a, b) => arr.indexOf(a) === b)
    }

    openEdit() {
        this.props.objTag('address');
        const addressDetails = Object.assign({}, this.props.addressData);
        this.setState({
            showEdit: true,
            newAddress: addressDetails
        })
    }

    closeEdit() {
        this.props.objTag('');
        this.setState({
            showEdit: false
        })
    }

    saveAddress(e) {
        e.preventDefault();
        this.props.saveProfileData(this.state.newAddress);
        this.closeEdit();
    }

    render() {
        return(
            this.state.showEdit ? this.renderEdit() : this.renderDisplay()
        )
    }
   
    renderEdit() {
        const countryList = Object.keys(Countries);
        const cityList = Object.values(Countries);
        
        return (
            <React.Fragment>
                <div className="row">
                    <div className="four wide column">
                        <div className="field">
                            <ChildSingleInput
                                inputType="number"
                                label="Number"
                                name="number"
                                value={this.state.newAddress.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder=""
                                errorMessage="Please enter a valid Number"
                            />
                        </div>
                    </div>
                    <div className="eight wide column">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newAddress.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder=""
                                errorMessage="Please enter a valid Street"
                            />
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newAddress.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder=""
                                errorMessage="Please enter a valid Suburb"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="six wide column">
                        <div className="field">
                            <label>Country</label>
                            <select
                                className="country"
                                value={this.state.newAddress.country}
                                onChange={this.handleSelectChange}>
                                <option value="">Select Country</option>
                                {countryList.map(country => {
                                    return (
                                        <option
                                            key={country}
                                            value={country}>{country}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="six wide column">
                        <div className="field">
                            <label>City</label>
                            <select
                                className="city"
                                value={this.state.newAddress.city}
                                onChange={this.handleSelectChange}>
                                <option value="">Select City</option>
                                {this.state.newAddress.country ?
                                    this.removeDuplicates(cityList[countryList.indexOf(this.state.newAddress.country)]).map(city => {
                                    return (
                                        <option
                                            key={city}
                                            value={city}>{city}</option>
                                    );
                                    }) : ""
                                }
                            </select>
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="field">
                            <ChildSingleInput
                                inputType="number"
                                label="Postcode"
                                name="postCode"
                                value={this.state.newAddress.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder=""
                                errorMessage="Please enter a valid Postcode"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        <button type="submit" className="ui black button" onClick={this.saveAddress}>Save</button>
                        <button className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
            )
    }

    renderDisplay() {
        let address = this.props.addressData.number ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ''
        //let address = this.props.addressData ? `${this.state.newAddress.number}, ${this.state.newAddress.street}, ${this.state.newAddress.suburb}, ${this.state.newAddress.postCode}` : ''
        let city = this.props.addressData ? this.props.addressData.city : ''
        let country = this.props.addressData ? this.props.addressData.country : ''

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(event) {
        this.props.saveProfileData({nationality: event.target.value});
    }
    
    render() {
        const countryList = Object.keys(Countries);
        return (
            <div className="row">
                <div className="four wide column">
                    <div className="field">
                        <label>Nationality</label>
                        <select
                            className="nationality"
                            value={this.props.nationality ? this.props.nationality : ''}
                            onChange={this.handleSelectChange}>
                            <option value="">Select Country</option>
                            {countryList.map(country => {
                                return (
                                    <option
                                        key={country}
                                        value={country}>{country}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
        
    }
}