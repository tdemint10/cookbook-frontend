import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        width: '75%'
    },
    actions: {
        textAlign: 'right'
    },
    addButton: {
        color: 'green'
    },
    card: {
        maxWidth: 300
    },
    grid: {
        margin: 'auto'
    },
    media: {
        height: 300,
        width: 300
    },
}));

export default function SearchRecipe() {
    let history = useHistory();
    const classes = useStyles();

    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onOpenClick = (id) => {
        history.push(`/recipe/${id}`)
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/recipe/")
            .then(response => {
                setRecipeList(response.data);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className={classes.root}>
            {!isLoading && 
                <Grid className={classes.grid} container spacing={2}>
                    <Grid className={classes.actions} item xs={12}>
                        <Button 
                            className={classes.addButton}
                            variant="outlined" 
                            color="primary" 
                            onClick={() => history.push("/recipe/add")}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Grid>
                    {recipeList.map((recipe, index) => (
                        <Grid key={index} item xs={4}>
                            <Card className={classes.card}>
                                <CardHeader 
                                    title={recipe.name}
                                />
                                <CardMedia 
                                    square="true"
                                    className={classes.media}
                                    image={recipe.imageUrl}
                                    title={recipe.name} />
                                <CardContent>
                                    <Typography variant="body1">{recipe.description}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button variant="outlined" color="primary" onClick={() => onOpenClick(recipe.id)}>Open</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    )
}