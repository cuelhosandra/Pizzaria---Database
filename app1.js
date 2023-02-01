  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

//   Constante que inicializa o banco de dados
  const app = initializeApp({
    apiKey: "AIzaSyCUOQYf7GAC1zOBD_1JRKkKD1kIlbYy58A",
    authDomain: "restaurant-fdebd.firebaseapp.com",
    projectId: "restaurant-fdebd",
    storageBucket: "restaurant-fdebd.appspot.com",
    messagingSenderId: "406176612832",
    appId: "1:406176612832:web:a6d9be997b71f023746b85"
  });


 // Inicializa o firestore
const db = getFirestore(app);

//GET
const cadastro = collection(db,'cadastros')
  
  const cadastroList = document.querySelector('[data-js="cadastros-list"]')
  
  const querySnapshot = await getDocs(cadastro);
  
  querySnapshot.forEach((doc) => {    
      const {nome, preco, sabor, info, img} = doc.data()
  
      cadastroList.innerHTML += `
      
      <li class="principal">
          <h5>${nome}</h5>
  
          <ul>
              <li>Preço: ${preco}</li>
              <li>Sabor: ${sabor}</li>
              <li>Informações adicionais: ${info}</li>
              <li>ID: ${doc.id}</li>
              <li><img src="${img}" width="150"></li>             
          </ul>
          <br>
          <button data-update="${doc.id}" class="btn" > Editar</button> 
          <button data-remove="${doc.id}" class="btn" >Remover</button>
      </li>
      
      `
      
  })

// Adiciona os dados do form para o banco de dados
submitData.addEventListener('click', (e) => {

    var nome = document.getElementById('txtNome').value;
    var preco = document.getElementById('txtPreco').value;
    var sabor = document.getElementById('txtSabor').value;
    var info = document.getElementById('txtInfo').value;
    var img = document.getElementById('txtImg').value;


    addDoc(collection(db,"cadastros"),{
        nome: nome,
        preco: preco,
        sabor: sabor,
        info: info,
        img: img
    });

    alert('Cadastro concluído');
});

//Update

submitData.addEventListener('click', (e) => {

  var nome = document.getElementById('txtNome').value;
  var preco = document.getElementById('txtPreco').value;
  var sabor = document.getElementById('txtSabor').value;
  var info = document.getElementById('txtInfo').value;
  var img = document.getElementById('txtImg').value;


  updateDoc(collection(db,"cadastros"),{
      nome: nome,
      preco: preco,
      sabor: sabor,
      info: info,
      img: img
  });

  alert('Edição concluída');
});


// updateData.addEventListener('click', (e) => {

//     var nome = document.getElementById('txtNome').value;
//     var preco = document.getElementById('txtPreco').value;
//     var sabor = document.getElementById('txtSabor').value;
//     var info = document.getElementById('txtInfo').value;
//     var img = document.getElementById('txtImg').value;
  


//     updateDoc(doc(db,"cadastros"),{
//         nome: nome,
//         preco: preco,
//         sabor: sabor,
//         info: info,
//         img: img
        
//     });

//     alert('Update concluído');
// });

//Delete

const buttons = document.querySelectorAll(".btn")
  
buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        console.log(button.dataset.remove)
        deleteDoc(doc(cadastro, button.dataset.remove))
    })
})

console.log(doc(cadastro)) 

//Delete

// deleteData.addEventListener('click', (e) => {

//     var nome = document.getElementById('txtNome').value;
//     var preco = document.getElementById('txtPreco').value;
//     var sabor = document.getElementById('txtSabor').value;
//     var info = document.getElementById('txtInfo').value;
//     var img = document.getElementById('txtImg').value;
  


//     deleteDoc(doc(db,"cadastros"));

//     alert('Delete concluído');
// });
