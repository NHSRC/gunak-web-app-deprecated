import React, {Component} from 'react';
import {MenuItem} from "react-bootstrap";
import {connect} from "react-redux";
import fields from './configFields';
import addField from "../actions/addField";
import PropTypes from 'prop-types';

const FieldIcon = (props) => {
    const field = props.field;
    if (field.isStack) {
        return (
            <i className="fa-stack">
                <i className={`fa fa-${field.iconWrapper} fa-stack-2x`}/>
                <i className="fa-stack-1x">{field.iconContent}</i>
            </i>);
    }
    return <i className={`fa fa-${field.icon}`}/>;
};

class FieldList extends Component {
    constructor(props) {
        super(props);
    }

    static addFieldsRow(fields) {
        return (
            <div className="row list-group-horizontal list-unstyled">
                {fields}
            </div>
        );
    }

    renderFields() {
        const onClick = this.props.onClick;
        let rows = [];
        let cols = [];
        fields.forEach((field, icon) => {
            cols.push(
                <div className="col-4 list-group-item" key={icon}>
                    <MenuItem key={icon} eventKey={icon} onClick={(e) => onClick(e)} name={field.icon}>
                        <FieldIcon field={field}/>{" " + field.label}
                    </MenuItem>
                </div>);
            if (cols === 3) {
                rows.push(FieldList.addFieldsRow(cols));
                cols = [];
            }
        });
        if (cols.length > 0) {
            rows.push(FieldList.addFieldsRow(cols));
        }
        return rows;
    }

    render() {
        let allFields = this.renderFields();
        return (
            <div className="card">
                <div className="card-header">
                    <strong>Select Field</strong>
                </div>
                <div className="card-body">
                    {allFields}
                </div>
            </div>
        );
    }
}

FieldList.propTypes = {
    onClick: PropTypes.func
};

export default connect(() => {
    return {}
}, {addField})(FieldList);