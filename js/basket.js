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
const article = createTag ('article', 'jumbotron col-md-8 teddys m-3 px-0 card shadow',null,div_row,null)
const div = createTag ('div', 'card-body', null, article, null)
const h2 = createTag ('h2','card-title text-danger font-weight-bold text-center','Vos Teddies:',div, null)

//Récupération du local storage
if(storedTeddies == null || storedTeddies.length === 0){
    // si le panier est vide 
     const emptyBasket = createTag ('p', 'card-text text-center', 'Votre panier est vide', div, null)
} else {
    // si des teddies sont présents dans le panier : récupération des teddies
    for (var storedTeddy of storedTeddies) {
        const eachTeddy = createTag ('div','card-body col-md-7 m-3 mx-auto card bg-danger shadow',null,div,null)
        const teddiesDetails = createTag ('p','card-title text-center text-light',storedTeddy.quantity + " " + storedTeddy.teddyName + ", " + storedTeddy.teddyColor, eachTeddy,null)
        const teddyPrice = createTag ('p', 'card-text text-center teddyPrice text-light', null, teddiesDetails, null)
        const price = createTag ('p', 'card-text text-center', storedTeddy.teddyPrice * storedTeddy.quantity + '€', teddyPrice, null)
    //Création bouton Supprimer
        const deleteButton = createTag ('button','btn btn-secondary fas fa-trash-alt',null,teddyPrice,null)
        deleteButton.setAttribute ('data-id', storedTeddy.teddyId)
        deleteButton.setAttribute ('data-color', storedTeddy.teddyColor)
    //Ecoute de l'évènement sur le boutton
            deleteButton.addEventListener('click' , function (event) {
            event.preventDefault()
            // console.log(event.target.getAttribute('data-id'))
            // console.log(event.target.getAttribute('data-color'))
            const storedTeddy = storedTeddies.filter(teddy =>teddy.teddyId == event.target.getAttribute('data-id') && teddy.teddyColor == event.target.getAttribute('data-color'))[0]
            console.log(storedTeddy)
            if (storedTeddy.quantity >= 1){
                storedTeddy.quantity --
                if (storedTeddy.quantity === 0){
                    const index = storedTeddies.indexOf(storedTeddy)
                    storedTeddies.splice (index, 1)
                }
            }
            //Enregistrement du nouveau localStorage
            localStorage.setItem('addTeddy', JSON.stringify(storedTeddies))
            JSON.parse(localStorage.getItem('addTeddy'))

            alert('Cet article a bien été supprimé !')
            window.location.href = "basket.html"
            })
    }

    //Création du formulaire de commande
    const form = createTag ('form', 'form-inline justify-content-center', null, article, null)
    const h3 = createTag ('h3','card-text m-5 text-center','Merci de remplir ce formulaire pour valider votre commande', form,null)

    //Création fonctions validité prénom, nom, ville
    function isValid(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value)
    }

    // création fonctions validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    }

    // création fonctions validité mail
    function validMail(value){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }

    // ajout formulaire "prénom"
    const divFirstName = createTag ('div', 'form-group', null, form, null)
    const labelFirstName = createTag ('label', null, 'Votre prénom:', divFirstName,{'for':'prénom'})
    const firstName = createTag ('input', null , null, divFirstName, {'type':'text','class':'name'})
    firstName.name = 'Prénom'
    firstName.required = true

    // Vérification de la validité du prénom
    firstName.addEventListener('change', function (event) {
        if (isValid(firstName.value)) {
        } else {
            alert( "Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // ajout formulaire "nom"
    const divLastName = createTag ('div', 'form-group', null, form, null)
    const labelLastName = createTag ('label', null, 'Votre nom: ', divLastName, {'for':'nom'})
    const lastName = createTag ('input', null, null, divLastName, {'type':'text', 'class':'name'})
    lastName.name = "Nom"
    lastName.required = true

    // Vérification validité du nom
    lastName.addEventListener("change", function (event) {
        if (isValid(lastName.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // ajout formulaire "adresse"
    const divAddress = createTag ('div','form-group',null, form, null)
    const labelAddress = createTag ('label', null, 'Votre adresse: ', divAddress, {'for':'adresse'})

    const address = createTag ('textarea','form-group', null, divAddress, {'type':'text', 'class':'name'});
    address.name = "Adresse"
    address.required = true;

    // Vérification validité de l'adresse
    address.addEventListener("change", function (event) {
        if (validAddress(address.value)){
        } else {
            event.preventDefault()
            alert("Aucun symbole n'est autorisé.")
        }
    })

    // ajout formulaire "ville"
    const divCity = createTag ('div','form-group', null, form, null);
    const labelCity = createTag ('label',null, 'Votre ville: ', divCity,{ 'for':'ville'} )
    const city = createTag ('input', null, null, divCity, { 'type':'text', 'class': 'name'})
    city.name = "Ville"
    city.required = true

    // Vérification validité de la ville
    city.addEventListener("change", function (event) {
        if (isValid(city.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // ajout formulaire "mail"
    const divMail = createTag ('div', 'form-group', null, form, null)
    const labelMail = createTag ('label', null, 'Votre adresse mail: ', divMail, {'for':'email'} );
    const mail = createTag ('input', null, null, divMail, {'type':'email', 'class':'name'})
    mail.name = "Adresse mail"
    mail.required = true

    // Vérification de la validité du mail
    mail.addEventListener("change", function (event) {
        if (validMail(mail.value)){
        } else {
            event.preventDefault()
            alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).")
        }
    })
}

