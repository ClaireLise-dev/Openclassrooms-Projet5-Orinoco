console.log(window.location.search);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const getTeddies = async function(url) {
    //Récupération des données du teddy sélectionné par son id
       let response = await fetch(url);
       if (response.ok) {
           let teddy = await response.json();
           console.log(teddy);
    //Création des éléments dans le DOM
            const div_row = document.getElementById('content-top');
            const div_col = document.createElement('div');
            const image = document.createElement('img');
            const article = document.createElement('article');
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const description = document.createElement ('p');
            const price = document.createElement('h3');
            const label = document.createElement('label');
            const select = document.createElement('select');
            const button = document.createElement('a');
    //Création du contenu
            h2.textContent = teddy.name;
            description.textContent = teddy.description;
            price.textContent = teddy.price / 100 + " €";
            label.textContent = "Personnalisez sa couleur : ";
            button.textContent = "Ajoutez"+" "+ teddy.name + " " + "au panier";
            label.setAttribute('for', "Choix de couleurs de " + teddy.name);
            select.setAttribute('name', "Choix de couleurs de " + teddy.name);
            button.setAttribute("href", "#");
            image.setAttribute("src", teddy.imageUrl);
            image.setAttribute("alt", teddy.name);
    //Création des class Bootstrap
            article.classList.add("col-md-5", "teddys", "m-3","px-0","card", "shadow");
            image.classList.add("card-img-top","img-responsive");
            div.classList.add("card-body");
            h2.classList.add("card-title");
            description.classList.add("card-text");
            price.classList.add("card-text");
            select.classList.add("form-control");
            button.classList.add("btn","btn-danger");
    //Création des éléments enfants
            div_row.appendChild(article);
            article.appendChild(image)
            article.appendChild(div);
            div.appendChild(h2);
            div.appendChild (description);
            div.appendChild(price);
            div.appendChild (label);
            div.appendChild (select);
            div.appendChild(button);
        //récupération des couleurs pour le Teddy
            const colors = teddy.colors;
                for (i = 0; i < colors.length; i++) {
                const selectOption = document.createElement('option');
                select.appendChild(selectOption);
                selectOption.textContent = colors[i];
                selectOption.setAttribute('value', colors[i]);
            }

    }
}

getTeddies (APIURL + id);