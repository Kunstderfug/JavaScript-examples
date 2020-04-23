import {
    elements,
} from './base'

export const getInput = () => elements.searchInput.value
export const clearInput = () => {
    elements.searchInput.value = ''
}
export const clearResults = () => {
    elements.searchResList.innerHTML = ''
    elements.searchResPages.innerHTML = ''
}

export const highlightSel = id => {
    const resArray = Array.from(document.querySelectorAll('.results__link'))
    resArray.forEach(el => el.classList.remove('results__link--active'))

    let el = document.getElementById(id)
    el.classList.add('results__link--active')
}

const limitResTitle = (title, limit = 16) => {
    let sign
    if (title.length > limit) {
        sign = title.indexOf(' ', limit)
        if (sign !== -1) {
            title = title.slice(0, sign)
            return `${title}`
        }
    }
    return `${title}`
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" id="${recipe.recipe_id}" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="image">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitResTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
    </button>
`

const renderButtons = (page, results, resPerPage) => {
    const pages = Math.ceil(results / resPerPage)
    let button;

    if (page === 1 && pages > 1) {
        // Only button to go to the next page
        button = createButton(page, 'next')
    } else if (page < pages) {
        // Show both buttons
        button = `${createButton(page, 'next')}${createButton(page, 'prev')}`
    } else if (page === pages && pages > 1) {
        // Only button to go to the previous page
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage
    const end = page * resPerPage

    recipes.slice(start, end).forEach(renderRecipe)

    //render pagination
    renderButtons(page, recipes.length, resPerPage)
}