import { async, trajets} from "./store.js";
const trips = await async(trajets);
const dataTrajet = new URLSearchParams(location.search);
const id = Number(dataTrajet.get("id"));
const trip = trips.find((trip) => {
  return trip.id === id;
});

let contentpricipale = document.querySelector(".contenent");
let messageError = document.querySelector(".messageError");
if (id > 20 || id <= 0 || !Number(id)) {
  contentpricipale.classList.add("hidden");
  messageError.classList.remove("hidden");
}
console.table(trip)
const Reservations = trip.reservations;
document.getElementById("linkCabine").href=`cabine.html?id=${id}`
let title=document.querySelector(".titleTrajet");
title.textContent=`${trip.departure}  → ${trip.destination}`
const container=document.querySelector(".countainer_Tickets");
const input=document.querySelector(".search");

//remplir reservation from lacol storage 

 let count=document.querySelector(".cout-ticket");
 count.textContent=Reservations.length;
input.addEventListener("input",()=>{
   let content =input.value.toLowerCase()
     const cards = container.querySelectorAll(".ticket");

    cards.forEach(card => {

        let contenu = card.textContent.toLowerCase();
     
        if( contenu.includes(content))
            {
                 card.classList.remove("hidden");
            }
            else
            {
                 card.classList.add("hidden")
            }
    
     

    });
   
})



 //remplir le container by data from array

 container.innerHTML=Reservations.map((ticket,index)=>{
    return `<div class="ticket rounded-xl border-1 border-[rgba(142,125,37,0.911)] shadow-sm shadow-[rgba(160,142,53,0.52)] p-3 h-60 w-[300px] ">
                <p class="flex justify-center mb-2"><img src="images/ticket-icon.svg" alt="ticket-icon" class="w-10"></p>
                <table class="table_tickets">
                  <tr>
                    <td class="name">ticket:</td>
                    <td class="value">${index+1}</td>
                  </tr>
                  <tr>
                    <td class="name">Passager:</td>
                    <td class="value nom">${ticket.name}</td>
                  </tr>
                  <tr>
                    <td class="name">Siege:</td>
                    <td class="value">${ticket.seat}</td>
                  </tr>
                  <tr>
                    <td class="name ">Trajet:</td>
                    <td class="value text-sm">${trip.departure} → ${trip.destination} </td>
                  </tr>
                </table>
               
              </div>`
 }
   
 ).join("");

//  let tickets=document.querySelectorAll(".ticket");
//      tickets.forEach(ticket=>{
//       let nom=ticket.querySelector(".nom");

//       console.log(nom.textContent)
      
    //  })



// 