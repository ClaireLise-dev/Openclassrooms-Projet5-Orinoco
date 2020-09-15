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
       }
    }

getTeddies ();