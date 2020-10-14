// Récupération des données du Localstorage
let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'));
if (storedTeddies === null || storedTeddies === undefined){
    storedTeddies = []
}
console.log(storedTeddies);

// Création des bases du panier
const div_row = document.getElementById('content-top')
const article = createTag ('article', 'jumbotron col-md-8 teddys m-3 px-0 card shadow',null,div_row,null)
const div = createTag ('div', 'card-body', null, article, null)
const h2 = createTag ('h2','card-title text-danger font-weight-bold text-center','Vos Teddies:',div, null)

// Récupération du local storage
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
    // Création bouton Supprimer
        const deleteBtn = createTag ('button','btn btn-secondary fas fa-trash-alt',null,teddyPrice,null)
        deleteBtn.setAttribute ('data-id', storedTeddy.teddyId)
        deleteBtn.setAttribute ('data-color', storedTeddy.teddyColor)
    // Ecoute de l'évènement sur le boutton
        deleteBtn.addEventListener('click' , function (e) {
        e.preventDefault()
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

    let calculPrice = []
    for (storedTeddy of storedTeddies) {
        let article = storedTeddy.teddyPrice * storedTeddy.quantity
        calculPrice.push(article)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalPrice = calculPrice.reduce(reducer, 0)
    console.log(totalPrice)

    const total = createTag ('p', 'card-text text-center text-danger font-weight-bold m-3', 'Montant total du panier = '+ totalPrice + ' €', article, null)

    // Création du formulaire de commande
    const form = createTag ('form', 'card-body text-center col-md-8 m-3 mx-auto shadow', null, article, null)
    const h3 = createTag ('h3','m-5 text-center','Merci de remplir ce formulaire pour valider votre commande', form,null)

    // Création fonctions validité prénom, nom, ville, code postal, mail
    function validName(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value)
    }

    // Création fonctions validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    }

    // Création fonctions validité code postal
    function validPostalCode(value) {
        return /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(value)
    }

    // Création fonctions validité mail
    function validMail(value){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }

    // Ajout formulaire prénom
    const formFirstName = createTag ('div', 'form-group', null, form, null)
    const labelFirstName = createTag ('label', null, 'Votre prénom:', formFirstName,{'for':'prénom'})
    const firstName = createTag ('input', null , null, formFirstName, {'type':'text','class':'form-control', 'name':'Prénom', 'required':'true'})

    // Vérification de la validité du prénom
    firstName.addEventListener('change', function (event) {
        if (validName(firstName.value)) {
        } else {
            alert( "Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // Ajout formulaire nom
    const formLastName = createTag ('div', 'form-group', null, form, null)
    const labelLastName = createTag ('label', null, 'Votre nom: ', formLastName, {'for':'nom'})
    const lastName = createTag ('input', null, null, formLastName, {'type':'text', 'class':'form-control','name':'nom', 'required':'true'})

    // Vérification validité du nom
    lastName.addEventListener('change', function (event) {
        if (validName(lastName.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // Ajout formulaire adresse
    const formAddress = createTag ('div','form-group',null, form, null)
    const labelAddress = createTag ('label', null, 'Votre adresse: ', formAddress, {'for':'adresse'})
    const address = createTag ('textarea',null, null, formAddress, {'type':'text', 'class':'form-control','name':'Adresse', 'required':'true'})

    // Vérification validité de l'adresse
    address.addEventListener('change', function (event) {
        if (validAddress(address.value)){
        } else {
            event.preventDefault()
            alert("Aucun symbole n'est autorisé.")
        }
    })

    // Ajout formulaire code postal
    const formPostalCode = createTag ('div','form-group',null, form, null)
    const labelPostalCode = createTag ('label', null, 'Votre code postal: ', formPostalCode, {'for':'code postal'})
    const postalCode = createTag ('input', null, null, formPostalCode, {'type':'text', 'class': 'form-control', 'name':'code postal', 'required':'true'})
 
    // Vérification validité du code postal
    postalCode.addEventListener('change', function (event) {
    if (validPostalCode(postalCode.value)) {
    } else {
        alert("Aucune lettre ou symbole n'est autorisé.")
        event.preventDefault()
    }
})
    //ajout formulaire ville
    const formCity = createTag ('div','form-group', null, form, null);
    const labelCity = createTag ('label',null, 'Votre ville: ', formCity,{'for':'ville'} )
    const city = createTag ('input', null, null, formCity, { 'type':'text', 'class': 'form-control','name':'Ville','required':'true'})

    //Vérification validité de la ville
    city.addEventListener('change', function (event) {
        if (validName(city.value)) {
        } else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // Ajout formulaire mail
    const formMail = createTag ('div', 'form-group', null, form, null)
    const labelMail = createTag ('label', null, 'Votre adresse mail: ', formMail, {'for':'email'} );
    const mail = createTag ('input', null, null, formMail, {'type':'email', 'class':'form-control', 'name':'mail', 'required':'true'})

    // Vérification de la validité du mail
    mail.addEventListener("change", function (event) {
        if (validMail(mail.value)){
        } else {
            event.preventDefault()
            alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).")
        }
    })

    // Création bouton validation de commande

    let submit = createTag ('button','btn btn-danger','Validez votre commande', form, {'type':'submit','name':'add','id':'valid'})

    // Envoi des données panier + contact au serveur si le formulaire est valide
    submit.addEventListener('click', function (event) {
        if(validName(firstName.value) && validName(lastName.value) && validAddress(address.value) && validName(city.value) && validMail(mail.value)){
         event.preventDefault()

         // Envoi du totalPrice au localStorage
         localStorage.setItem('totalPrice', totalPrice)
         const storagePrice = localStorage.getItem('totalPrice')
         console.log(storagePrice)

        // Création de l'objet contact
         let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            postalCode: postalCode.value,
            city: city.value,
            email: mail.value,
        }
        console.log(contact)

       // Création du tableau teddies
       let products = []
       for (storedTeddy of storedTeddies) {
           let productsId = storedTeddy.teddyId
           products.push((productsId))
       }
       console.log(products)

       // Création d'un objet regroupant contact et produits
       let send = {
           contact,
           products,
       }
       console.log(send)

       // Envoi des données au serveur
       const post = async function (data){
           try {
               let response = await fetch('http://localhost:3000/api/teddies/order', {
                   method: 'POST',
                   body: JSON.stringify(data),
                   headers: {
                       'Content-Type': 'application/json'
                   }
               })
               if (response.ok) {
                   let data = await response.json()
                   console.log (data.orderId)
                   localStorage.setItem('Order', data.orderId)
                   window.location = 'confirmation.html'
                   localStorage.removeItem('addTeddy')

               } else {
                   event.preventDefault();
                   console.error('Retour du serveur : ', response.status)
                   alert('Erreur rencontrée : ' + response.status)
               }
           } catch (error) {
               alert("Erreur : " + error)
           }
       }
       post(send)
   }
}
)}