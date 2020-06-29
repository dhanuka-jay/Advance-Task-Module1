import React from 'react';

export default class SkillItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleCancelAction = this.handleCancelAction.bind(this);
        this.handleEditAction = this.handleEditAction.bind(this);
    }

    handleCancelAction() {
        this.props.delItem(this.props.sklItm.id);
    }

    handleEditAction() {
        this.props.updateItem(this.props.sklItm);
    }

    render() {
        return (
            <tr>
                <td>{this.props.sklItm.name}</td>
                <td>{this.props.sklItm.level}</td>
                <td style={{ float: 'right' }}>
                    <i aria-hidden="true" className="edit icon" onClick={this.handleEditAction}></i>
                    <i aria-hidden="true" className="cancel icon" onClick={this.handleCancelAction}></i>
                </td>
            </tr>
        )
    }
}