  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

//  Constante que inicializa o banco de dados
  const app = initializeApp({
    apiKey: "AIzaSyCUOQYf7GAC1zOBD_1JRKkKD1kIlbYy58A",
    authDomain: "restaurant-fdebd.firebaseapp.com",
    projectId: "restaurant-fdebd",
    storageBucket: "restaurant-fdebd.appspot.com",
    messagingSenderId: "406176612832",
    appId: "1:406176612832:web:a6d9be997b71f023746b85"
  });

  
const db = getFirestore(app)

//Constante pra salvar no banco de dados
const cadastro = collection(db,'cadastros')
const listaCadastros = document.querySelector('[data-js="cadastros-list"]')

const querySnapshot = await getDocs(cadastro);

querySnapshot.forEach((doc) => {    
    const {nome, preco, sabor, info, imgRef} = doc.data()

    listaCadastros.innerHTML += `
    <li data-id="${doc.id}">

        <ul>
            <li>Nome: ${nome}</li>
            <li>Preço: ${preco}</li>
            <li>Sabor: ${sabor}</li>
            <li>Informações: ${info}</li>
            <li><img src="${imgRef}" width="150"></li>
            <li>ID: ${doc.id}</li>
           
        </ul>
        <br>
        <button data-remove="${doc.id}" class="btn">Remover</button>
    </li>
    `
    
})

const buttons = document.querySelectorAll(".btn")

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        console.log(button.dataset.remove)
        deleteDoc(doc(cadastro, button.dataset.remove))
    })
})

console.log(doc(cadastro))


const addcadastro =  document.querySelector('[data-js="add-cadastro-form"]')

addcadastro.addEventListener('submit',e =>{
    e.preventDefault();

    addDoc(cadastro,{
        nome:e.target.nome.value,
        preco: e.target.preco.value,
        sabor: e.target.sabor.value,
        info: e.target.info.value,
        // imgRef: e.target.poster.value,
        createdAt: serverTimestamp()
    }).then(doc=>{console.log("Documento adicionado com sucesso: ", doc.id)})
    
})
