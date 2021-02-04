import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto'
    }
}))

export default function ShoppingList() {
    let history = useHistory();
    const classes = useStyles();

    let { shoppingListId } = useParams();

    const [createdAt, setCreatedAt] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/shoppingList/${shoppingListId}`)
            .then(response => {
                setCreatedAt(response.data.createdAt);
                setItems(response.data.items);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className={classes.root}>
            <h1>Hello Shopping List!</h1>
            <h3>{createdAt}</h3>

            <List>
            {items.map((item, index) => (
                <ListItem key={index}>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}