import React from 'react';
import { Table } from 'semantic-ui-react'

export default class ExperienceList extends React.Component{
    constructor(props) {
        super(props);

        this.dateOrdinal = this.dateOrdinal.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }


    dateOrdinal(d) {
        return d + (31 == d || 21 == d || 1 == d ? "st" : 22 == d || 2 == d ? "nd" : 23 == d || 3 == d ? "rd" : "th")
    };

    handleEditItem() {
        this.props.editItem(this.props.experience.id)
    }

    handleDeleteItem() {
        this.props.deleteExperience(this.props.experience)
    }

    render() {
        const { id, company, position, responsibilities } = this.props.experience;
        const start = new Date(this.props.experience.start)
        const end = new Date(this.props.experience.end)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (
                    <tr>
                        <td>{company}</td>
                        <td>{position}</td>
                        <td>{responsibilities}</td>
                        <td>{`${this.dateOrdinal(start.getDate())} ${monthNames[start.getMonth()]} ${start.getFullYear()}`}</td>
                        <td>{`${this.dateOrdinal(end.getDate())} ${monthNames[end.getMonth()]} ${end.getFullYear()}`}</td>
                        <td style={{ float: 'right' }}>
                            <i aria-hidden="true" className="edit icon" onClick={this.handleEditItem}></i>
                            <i aria-hidden="true" className="cancel icon" onClick={this.handleDeleteItem}></i>
                        </td>
                    </tr>
            )
    }
}