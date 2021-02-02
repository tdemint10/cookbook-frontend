import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    recipeActions: {
        textAlign: 'right'
    },
    recipeName: {
        textAlign: 'left'
    },
}))

export default function RecipeTitle(props) {
    const classes = useStyles();

    if (props.isEditMode) {
        return (
            <div className={classes.root}>
                <TextField
                    id="recipe-name"
                    label="Recipe Name"
                    variant="outlined"
                    defaultValue={props.name}
                    onChange={(e) => props.onNameChange(e.target.value)}
                />
            </div>
        );
    }
    else {
        return (
            <div className={classes.root}>
                <Typography variant="h4">
                    {props.name}&nbsp;

                    {props.isFavorite && 
                        <IconButton color="secondary" onClick={props.onIsFavoriteChange}>
                            <FavoriteIcon />
                        </IconButton>
                    }

                    {!props.isFavorite &&
                        <IconButton color="secondary" onClick={props.onIsFavoriteChange}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    }
                </Typography>
            </div>
        );
    }
}

