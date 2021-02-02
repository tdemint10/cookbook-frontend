import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Recipe from './components/recipe/recipe.component';
import SearchRecipe from './components/search-recipe/search-recipe.component';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Typography variant="h1">Cookbook</Typography><br /><br />
        <Switch>
          <Route path="/recipe/:recipeId">
            <Recipe />
          </Route>
          <Route path="/recipe">
            <SearchRecipe />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
