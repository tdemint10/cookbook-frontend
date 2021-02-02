import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}))

export default function RecipeActions(props) {
    const classes = useStyles();

    if (props.isEditMode) {
        return (
            <div className={classes.root}>
                <Button variant="outlined" color="primary" onClick={props.onSaveClick}>Save</Button>
            </div>
        );
    }
    else {
        return (
            <div className={classes.root}>
                <Button variant="outlined" color="primary" onClick={props.onEditClick} startIcon={<EditIcon />}>Edit</Button>&nbsp;&nbsp;
                <Button variant="outlined" color="secondary" onClick={props.onDeleteClick} startIcon={<DeleteIcon />}>Delete</Button>
            </div>
        );
    }
}

