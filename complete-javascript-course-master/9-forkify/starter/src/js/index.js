//forkify-api.herokuapp.com
//const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'


//Global state of the app
//1. Search object
//2. Current recipe pbj
//3. Shoping list obj
//4. Likes recipes
const state = {}
window.state = state

//search Controller
const controlSearch = async () => {
    //1. Get query from the view
    const query = searchView.getInput()
    if (query) {
        //2. New search obj and add it to the state
        state.search = new Search(query)

        //3. Prepare the UI for results
        searchView.clearInput()
        searchView.clearResults()
        recipeView.clearRecipe()
        renderLoader(elements.searchRes)
        try {
            //4. Search for recipes
            await state.search.getResults()

            //5. Render results on the UI
            clearLoader()
            searchView.renderResults(state.search.result)
        } catch (err) {
            alert(`something is wrong with the search: ${err}`)
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = Number(btn.dataset.goto)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
})

//Recipe Controller
const controlRecipe = async () => {
    // Get the id from the URL
    const id = window.location.hash.replace('#', '')

    if (id) {
        // prepare the UI for changes
        recipeView.clearRecipe()
        renderLoader(elements.recipe)

        //Create new recipe object
        state.recipe = new Recipe(id)

        //Get the recipe data and parse the ingredients
        try {
            await state.recipe.getRecipe()
            console.log(state.recipe.ingredients)

            state.recipe.parseIngredients()

            //Calc servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()

            //Render the recipe
            clearLoader()
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            )
            //Hightlight selected search item
            if (state.search) {
                searchView.highlightSel(id) //TODO
            }
        } catch (err) {
            console.log(err);
            alert(`error processing the recipe: ${err}`)
        }
    }
}

;
['hashchange', 'load'].forEach(event =>
    window.addEventListener(event, controlRecipe)
)

// LIST controller

const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) state.list = new List()
    console.log(state.list);


    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item)
    })
}

// Handle delete and update shopping list items
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid

    // delete item from the list
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from the state
        state.list.delItem(id)

        //delete from the UI
        listView.deleteItem(id)

        //Update the state
    } else if (e.target.matches('.shopping__count--value')) {
        const val = Number(e.target.value)
        state.list.updateCount(id, val)
    }
})

// LIKES CONTROLLER

const persistData = () => {
    localStorage.setItem('likes', JSON.stringify(state.likes.likes))
    console.log('saved');
}

const controlLike = () => {
    if (!state.likes) state.likes = new Likes()

    const currentID = state.recipe.id
    //User has not liked the current recipe
    if (!state.likes.isLiked(currentID)) {
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        //Toggle the like button
        likesView.toggleLikeBtn(true)

        // Add like to the UI list
        likesView.renderLike(newLike);
        persistData()


        //User HAS liked the current recipe
    } else {
        //Remove like from the state and from local storage
        state.likes.delLike(currentID)
        persistData()

        //Toggle the like button
        likesView.toggleLikeBtn(false)
        // Remove like to the UI list
        likesView.deleteLike(currentID)
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes())
}

//Restore like recipes on page load
window.addEventListener('load', () => {
    //On window load we create new LIkes obj
    state.likes = new Likes()
    console.log('set new Likes');

    //read data from the local storage
    state.likes.readStorage()
    console.log('read the storage');

    //toggle the like button
    likesView.toggleLikeMenu(state.likes.getNumLikes())
    console.log('toggled the button');

    //Render likes in the menu
    state.likes.likes.forEach(like => {
        likesView.renderLike(like)
        console.log('rendered in the likes menu')
    })
})

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServIngr(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
        recipeView.updateServIngr(state.recipe)
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredients to the shopping list
        controlList()
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like controller
        controlLike()
    }
})