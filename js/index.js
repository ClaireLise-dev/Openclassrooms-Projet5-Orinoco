const getTeddies =  async function(url) {
    //Récupération des données de l'API
    try {let response = await fetch(url);
        if (response.ok) {
            let teddies = await response.json();
            console.log(teddies);
    //Création des éléments dans le DOM
            for (let teddy of teddies) {
                    const div_row = document.getElementById('content-top');
                    const div_col = document.createElement('div');
                    const image = document.createElement('img');
                    const article = document.createElement('article');
                    const div = document.createElement('div');
                    const h2 = document.createElement('h2');
                    const price = document.createElement('h3');
                    const button = document.createElement('a');
                    // const button = createTag ('a','','Personnalisez' +teddy.name,)

    //Ajout du contenu
                    h2.textContent = teddy.name;
                    price.textContent = teddy.price / 100 + " €";
                    button.textContent = "Personnalisez"+" "+ teddy.name + "!";
                    button.setAttribute("href", "./product.html?id=" + teddy._id);
                    image.setAttribute("src", teddy.imageUrl);
                    image.setAttribute("alt", teddy.name);
    //Ajout des Class Bootstrap
                    article.classList.add("col-md-5", "teddys", "m-3","px-0","card", "shadow");
                    image.classList.add("card-img-top","img-responsive");
                    div.classList.add("card-body");
                    h2.classList.add("card-title");
                    price.classList.add("card-text");
                    button.classList.add("btn","btn-danger");
    //Ajout des éléments enfants
                    div_row.appendChild(article);
                    article.appendChild(image)
                    article.appendChild(div);
                    div.appendChild(h2);
                    div.appendChild(price);
                    div.appendChild(button);
                }
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (error) {
        alert("Erreur : " + error);
    }
}
//Appel de la fonction getTeddies
getTeddies(APIURL);



const conteneur = document.getElementById ("truc")
const ul = createTag ("ul","a b", null, conteneur,{"test":"bidule","test2":"bidule2"})
// ul.setAttribute ("test", "bidule")
createTag ("li","a b", "Bonjour", ul)
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

