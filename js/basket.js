//Récupération des données du Localstorage
let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'));
if (storedTeddies === null || storedTeddies === undefined){
    storedTeddies = []
}
console.log(storedTeddies);

//Fonction createTag
function createTag (tag, className,content, parent, attributes) {
    const element = document.createElement (tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes){
        element.setAttribute (key, attributes [key])
    }
    parent.appendChild(element)
    return element
}
//Création des bases du panier
const div_row = document.getElementById('content-top')
const article = createTag ('article', 'col-md-8 teddys m-3 px-0 card shadow',null,div_row,null)
const div = createTag ('div', 'card-body', null, article, null)
const h2 = createTag ('h2','card-title text-danger font-weight-bold text-center','Vos Teddies:',div, null)

//Récupération du local storage
if(storedTeddies == null || storedTeddies.length === 0){
    // si le panier est vide 
    const emptyCart = createTag ('p', 'card-text text-center', 'Votre panier est vide!', div, null)
} else {
    // si des teddies sont présents dans le panier : récupération des teddies
    for (storedTeddy of storedTeddies) {
        const eachTeddy = createTag ('div','card-body col-md-7 m-3 mx-auto card bg-danger shadow',null,div,null)
        const teddiesCard = createTag ('p','card-title text-center text-light',storedTeddy.quantity + " " + storedTeddy.teddyName + ", " + storedTeddy.teddyColor, eachTeddy,null)
        const teddyPrice = createTag ('p', 'card-text text-center text-light', null, teddiesCard, null)
        const price = createTag ('p', 'card-text text-center', storedTeddy.teddyPrice * storedTeddy.quantity + '€', teddyPrice, null)
    }
}