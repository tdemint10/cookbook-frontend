import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    editField: {
        width: '100%',
    },
    infoCard: {
        maxWidth: '95%',
    },
    recipeImage: {
        height: 300,
    },
}))

export default function RecipeInfo(props) {
    const classes = useStyles();

    if (props.isEditMode) {
        return (
            <div className={classes.root}>
                <TextField 
                    className={classes.editField}
                    id="recipe-image-url" 
                    label="Image URL" 
                    variant="outlined"
                    defaultValue={props.imageUrl}
                    onChange={(e) => props.onImageUrlChange(e.target.value)}
                />
                <br /><br /><br />
                <TextField 
                    className={classes.editField}
                    id="recipe-description"
                    label="Recipe Description"
                    variant="outlined"
                    defaultValue={props.description}
                    onChange={(e) => props.onDescriptionChange(e.target.value)}
                />
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <Card className={classes.infoCard}>
                    <CardMedia className={classes.recipeImage} image={props.imageUrl} title="Recipe Image" />
                    <CardContent>
                        <Typography variant="body1">{props.description}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}