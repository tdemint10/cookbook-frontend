import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    addButton: {
        color: 'green'
    },
    directionDiv: {
        textAlign: 'left'
    },
    directionPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
    editDirectionDiv: {
        textAlign: 'left'
    },
    editDirection: {
        width: '90%'
    },
}))

export default function RecipeDirections(props) {
    const classes = useStyles();

    const buildDirectionString = (index, direction) => {
        return (index+1) + ") " + direction;
    }

    if (props.isEditMode) {
        return (
            <div className={classes.root}>
                <Paper className={classes.directionPaper} variant="outlined">
                    <Typography variant="h5">Directions:</Typography>

                    <div className={classes.editDirectionDiv}>
                    {props.directions.map((direction, index) => (
                        <div key={index}>
                            <TextField 
                                id={"direction-" + index}
                                className={classes.editDirection}
                                label="Direction"
                                variant="outlined"
                                defaultValue={direction}
                                onChange={(e) => props.onDirectionChange(e.target.value, index)}
                            />
                            <IconButton color="secondary" onClick={() => props.onDirectionDelete(index)}>
                                <DeleteIcon />
                            </IconButton>
                            <br /><br />
                        </div>
                    ))}

                        <Button variant="outlined" className={classes.addButton} onClick={props.onDirectionAdd}>
                            Add Direction
                        </Button>

                    </div>
                </Paper>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <Paper className={classes.directionPaper} variant="outlined">
                    <Typography variant="h5">Directions:</Typography><br />

                    <List>
                    {props.directions.map((direction, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={buildDirectionString(index, direction)} />
                        </ListItem>
                    ))}
                    </List>
                </Paper>
            </div>
        )
    }
}