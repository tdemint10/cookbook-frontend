import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RecipeActions from './recipe-actions.component';
import RecipeDirections from './recipe-directions.component';
import RecipeInfo from './recipe-info.component';
import RecipeIngredients from './recipe-ingredients.component';
import RecipeTitle from './recipe-title.component';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        width: '75%'
    },
    actions: {
        textAlign: 'right'
    },
    name: {
        textAlign: 'left'
    },
}));

function Recipe() {
    let history = useHistory();
    const classes = useStyles();
    let { recipeId } = useParams();

    const [id, setId] = useState(recipeId);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const createRecipe = () => {
        console.log("HERE - create")

        let requestBody = {
            "name": name,
            "isFavorite": false,
            "imageUrl": imageUrl,
            "description": description,
            "ingredients": ingredients,
            "directions": directions
        }

        console.log(requestBody);

        axios
            .post("http://localhost:5000/api/recipe/", requestBody)
            .then(response => {
                setIsEditMode(false);
                history.push(`/recipe/${response.data.id}`);
            })
            .catch(error => console.log(error));
    }

    const deleteRecipe = () => {
        axios
            .delete(`http://localhost:5000/api/recipe/${recipeId}`)
            .then(response => history.push("/recipe"))
            .catch(error => console.log(error));
    }

    const getRecipe = () => {
        axios
            .get(`http://localhost:5000/api/recipe/${recipeId}`)
            .then(response => {
                setId(response.data.id)
                setName(response.data.name);
                setDescription(response.data.description);
                setIngredients(response.data.ingredients);
                setDirections(response.data.directions);
                setIsFavorite(response.data.isFavorite);
                setImageUrl(response.data.imageUrl);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }

    const updateRecipe = () => {
        let requestBody = {
            "name": name,
            "imageUrl": imageUrl,
            "description": description,
            "ingredients": ingredients,
            "directions": directions
        }

        axios
            .put(`http://localhost:5000/api/recipe/${recipeId}`, requestBody)
            .then(response => {
                setId(response.data.id);
                setName(response.data.name);
                setDescription(response.data.description);
                setIngredients(response.data.ingredients);
                setDirections(response.data.directions);
                setIsFavorite(response.data.isFavorite);
                setImageUrl(response.data.imageUrl);
                setIsLoading(false);
                setIsEditMode(false);
            })
            .catch(error => console.log(error));
    }

    const editIsFavorite = () => {
        axios
            .put(`http://localhost:5000/api/recipe/${recipeId}`, {"isFavorite": !isFavorite})
            .then(response => setIsFavorite(response.data.isFavorite))
            .catch(error => console.log(error));
    }

    const addIngredient = () => {
        let newIngredients = ingredients;

        newIngredients.push({});

        setIngredients([...newIngredients]);
    }

    const deleteIngredient = (index) => {
        let newIngredients = ingredients;

        newIngredients.splice(index, 1);

        setIngredients([...newIngredients]);
    }

    const updateIngredient = (fieldId, value, index) => {
        let newIngredients = ingredients;

        if (fieldId.includes("name"))
            newIngredients[index].name = value;
        else if (fieldId.includes("amount"))
            newIngredients[index].amount = parseFloat(value);
        else if (fieldId.includes("unit"))
            newIngredients[index].unit = value;

        setIngredients([...newIngredients]);
    }

    const addDirection = () => {
        let newDirections = directions;

        newDirections.push("");

        setDirections([...newDirections]);
    }

    const deleteDirection = (index) => {
        let newDirections = directions;

        newDirections.splice(index, 1);

        setDirections([...newDirections]);
    }

    const updateDirection = (value, index) => {
        let newDirections = directions;

        newDirections[index] = value;

        setDirections([...newDirections]);
    }

    const saveRecipe = () => {
        if (recipeId.localeCompare("add") === 0) 
            createRecipe();
        else 
            updateRecipe();
        
    }

    useEffect(() => {
        setIsEditMode(false);
        if (recipeId.localeCompare("add") === 0) {
            setIsEditMode(true);
            setIsLoading(false);
        } else {
            getRecipe();
        }
    }, [])

    return (
        <div className={classes.root}>
            {isLoading && <p>Loading Recipe...</p>}

            {!isLoading &&
                <Grid container spacing={3}>
                    <Grid className={classes.name} item xs={8}>
                        <RecipeTitle isEditMode={isEditMode} name={name} onNameChange={setName} isFavorite={isFavorite} onIsFavoriteChange={editIsFavorite} />
                    </Grid>
                    <Grid className={classes.actions} item xs={4}>
                        <RecipeActions isEditMode={isEditMode} onEditClick={() => setIsEditMode(true)} onDeleteClick={deleteRecipe} onSaveClick={saveRecipe} />
                    </Grid>

                    <Grid item xs={4}>
                        <RecipeInfo isEditMode={isEditMode} imageUrl={imageUrl} onImageUrlChange={setImageUrl} description={description} onDescriptionChange={setDescription} />
                    </Grid>
                    <Grid item xs={8}>
                        <RecipeIngredients isEditMode={isEditMode} ingredients={ingredients} onIngredientChange={updateIngredient} onIngredientDelete={deleteIngredient} onIngredientAdd={addIngredient} />
                    </Grid>

                    <Grid item xs={12}>
                        <RecipeDirections isEditMode={isEditMode} directions={directions} onDirectionChange={updateDirection} onDirectionDelete={deleteDirection} onDirectionAdd={addDirection} />
                    </Grid>
                </Grid>
            }
        </div>
    )
}

export default Recipe;