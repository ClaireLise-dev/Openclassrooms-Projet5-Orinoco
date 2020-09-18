console.log(window.location.search);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const getTeddies = async function() {
    //Récupération des données du teddy sélectionné par son id
       let response = await fetch('http://localhost:3000/api/teddies/'+ id);
       if (response.ok) {
           let teddy = await response.json();
           console.log(teddy);

            const div_row = document.getElementById('content-top');
            const div_col = document.createElement('div');
            const image = document.createElement('img');
            const article = document.createElement('article');
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const price = document.createElement('p');
            const button = document.createElement('a');

            h2.textContent = teddy.name;
            price.textContent = teddy.price / 100 + " €";
            button.textContent = "Ajoutez"+" "+ teddy.name + " " + "au panier!";
            button.setAttribute("href", "#");
            image.setAttribute("src", teddy.imageUrl);
            image.setAttribute("alt", teddy.name);

            article.classList.add("col-md-5", "teddys", "m-3","px-0","card", "shadow");
            image.classList.add("card-img-top","img-responsive");
            div.classList.add("card-body");
            h2.classList.add("card-title");
            price.classList.add("card-text");
            button.classList.add("btn","btn-danger");

            div_row.appendChild(article);
            article.appendChild(image)
            article.appendChild(div);
            div.appendChild(h2);
            div.appendChild(price);
            div.appendChild(button);
       }
    }

getTeddies ();