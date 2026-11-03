
import * as store from "./store.js"
import {estComplet, test} from "./reservations.js"
import * as render from "./render.js"
const trips= await store.async(store.trajets)
let total=6;
let page=1  
// console.table(trips)
function afficher(trips) {
  
    render.renderPagination(trips,page,total)
    
}   
afficher(trips)

function Recherche(trips)
{
  let ville=document.getElementById("cherche").value.toLowerCase();
  let statut=document.getElementById("filter").value;
  let message=document.querySelector(".message");
 
        
  let NewTable=trips.filter(trip=>{
       let search=trip.departure.toLowerCase().includes(ville)||trip.destination.toLowerCase().includes(ville);
     
       let filter=true;
          if(statut==="Disponible"){ filter=!estComplet(trip)}
          if(statut==="Complet"){ filter=estComplet(trip)};

       return search && filter
  })
    if(NewTable.length===0)
    {
        message.style.display="block"
    }
    else
    {
        message.style.display="none"
    }
    
       afficher(NewTable)
    
    
}
    //action de recherche et filtrer
    let input = document.getElementById("cherche");
    let select = document.getElementById("filter");
    input.addEventListener("input",()=>{Recherche(trips)})
    select.addEventListener("change",()=>{Recherche(trips)})
    
    
    // stastique des trajets
       const totalPassager=trips.reduce((total,trip)=>{
        return  total+trip.reservations.length;
       },0)
       let passagers=document.querySelector(".totalPassager")
       passagers.textContent=totalPassager

       const recette=trips.reduce((total,trip)=>{
        return  total+trip.reservations.length*trip.price;
       },0).toLocaleString("fr-FR")
       let chiffreAffire=document.getElementById("recette")
       chiffreAffire.textContent=recette



       //lier la page trajets avec la page cabine 

       let gridTrajets=document.querySelector(".gridTrajets")

       gridTrajets.addEventListener("click",(e)=>{
       let trajetChoisi=e.target.closest("[data-id]")
         if(trajetChoisi===null)
            {
            // alert("trajets introuvable")
               e.preventDefault()
               return
            }
            else
            {
               window.location.href=`cabine.html?id=${trajetChoisi.dataset.id}`
            }
       })