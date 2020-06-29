import React from 'react';

export default class LanguageItem extends React.Component{
    constructor(props) {
        super(props);

        this.handleCancelAction = this.handleCancelAction.bind(this);
        this.handleEditAction = this.handleEditAction.bind(this);
    }

    handleCancelAction() {
        this.props.delItem(this.props.lngItm.id);
    }

    handleEditAction() {
        this.props.updateItem(this.props.lngItm);
    }

    render() {
            return (
                    <tr>
                        <td>{this.props.lngItm.name}</td>
                        <td>{this.props.lngItm.level}</td>
                        <td style={{ float: 'right' }}><i aria-hidden="true" className="edit icon" onClick={this.handleEditAction}></i><i aria-hidden="true" className="cancel icon" onClick={this.handleCancelAction}></i></td>
                    </tr>
            )
    }
}