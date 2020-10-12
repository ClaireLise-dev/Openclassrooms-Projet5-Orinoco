// récupération de l'id de la commande
let orderId = localStorage.getItem('Order');
console.log(orderId);

// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);

//Fonction CreateTag
function createTag (tag, className,content, parent, attributes) {
    const element = document.createElement (tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes){
        element.setAttribute (key, attributes [key])
    }
    parent.appendChild (element)
    return element
}

// récapitulatif de votre commande
const div_row = document.getElementById('content-top')
const article = createTag ('article', 'jumbotron col-md-8 teddys m-3 px-0 card shadow',null,div_row,null)
const div = createTag ('div', 'card-body', null, article, null)
const h2 = createTag ('h2','card-title text-danger font-weight-bold text-center','Votre commande: ',div, null)
const order = createTag ('p', 'card-text text-center', 'Numéro de commande: ' + orderId, article, null)
const price = createTag ('p','card-text text-center', 'Montant total de votre commande: ' + totalPrice + ' €', article, null)
const thanksMessage = createTag ('p','card-text text-center text-danger font-weight-bold', "Merci d'avoir commandé chez Oriteddies!", article, null)

// Efface localStorage
localStorage.clear()