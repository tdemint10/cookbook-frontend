import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    addButton: {
        color: 'green'
    },
    ingredientDiv: {
        textAlign: 'left'
    },
    ingredientPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
    editIngredientDiv: {
        textAlign: 'left'
    },
    editIngredientName: {
        width: '40%'
    },
    editIngredientAmount: {
        width: '10%'
    },
    editIngredientUnit: {
        width: '20%'
    },
}))

export default function RecipeIngredients(props) {
    const classes = useStyles();

    const buildIngredientString = (ingredient) => {
        return ingredient.name + " - " + ingredient.amount + " " + ingredient.unit;
    }

    if (props.isEditMode) {
        return (
            <div className={classes.root}>
                <Paper className={classes.ingredientPaper} variant="outlined">
                    <Typography variant="h5">Ingredients (edit):</Typography><br />

                    <div className={classes.editIngredientDiv}>
                    {props.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <TextField 
                                id={"ingredient-name-" + index}
                                className={classes.editIngredientName}
                                label="Name"
                                variant="outlined"
                                defaultValue={ingredient.name || ""}
                                onChange={(e) => props.onIngredientChange(e.target.id, e.target.value, index)}
                            />&nbsp;
                            <TextField 
                                id={"ingredient-amount-" + index}
                                className={classes.editIngredientAmount}
                                label="Amount"
                                variant="outlined"
                                defaultValue={ingredient.amount || "0"}
                                onChange={(e) => props.onIngredientChange(e.target.id, e.target.value, index)}
                            />&nbsp;
                            <TextField 
                                id={"ingredient-unit-" + index}
                                className={classes.editIngredientUnit}
                                label="Unit"
                                variant="outlined"
                                defaultValue={ingredient.unit || ""}
                                onChange={(e) => props.onIngredientChange(e.target.id, e.target.value, index)}
                            />
                            <IconButton color="secondary" onClick={() => props.onIngredientDelete(index)}>
                                <DeleteIcon />
                            </IconButton>
                            <br /><br />
                        </div>
                    ))}

                        <Button variant="outlined" className={classes.addButton} onClick={props.onIngredientAdd}>
                            Add Ingredient
                        </Button>

                    </div>
                </Paper>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <Paper className={classes.ingredientPaper} variant="outlined">
                    <Typography variant="h5">Ingredients:</Typography><br />

                    <List>
                    {props.ingredients.map((ingredient) => (
                        <ListItem key={ingredient.name}>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary={buildIngredientString(ingredient)} />
                        </ListItem>
                    ))}
                    </List>
                </Paper>
            </div>
        )
    }
}