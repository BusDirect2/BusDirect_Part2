import { async,trajets } from "./store.js";
import {placesLibres, prixSiege} from "./reservations.js"
        const trips=await async(trajets);
        const dataTrajet=new URLSearchParams(location.search);
        const id=Number(dataTrajet.get("id"))
        
            console.log('id trajet: '+id);
            const trip = trips.find(trip=>{
              return trip.id===id
            })
            let contentpricipale=document.querySelector(".contenent");
            let messageError=document.querySelector(".messageError");
        if(id>20 || id<=0 || !Number(id))
        {
            

            contentpricipale.classList.add("hidden")
            messageError.classList.remove("hidden")
            
        }
        
            const Reservations =trip.reservations;
            console.table("length de reservations :"+trip.reservations.length)
        
        
        // console.table(Reservations)

//affichage des inforamtions d'un boxes
const container = document.querySelector(".countainer-Box");
const NexSiege = document.querySelector(".Siege");
const nom = document.querySelector("#NomModifier");
const Boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");
const messageModifier = document.querySelector(".messageModifier");
const formModifier = document.querySelector(".EditForm");
const selectModifier = document.getElementById("newSeat");
const form = document.querySelector(".Ajouter-form");
const nomPassager = document.getElementById("NomModifier");
const NewPassager = document.getElementById("NouveauNom");
const NewSiege = document.getElementById("newSeat");
const messageSupprimer=document.querySelector(".messageSupprimer");
const RemoveForm=document.querySelector(".SupprimerForm");
const remove_select = document.querySelector(".RemoveNom");

//fonction d'affiche les details de trajet
saveArray()
getArray()  
document.querySelector(".cout-ticket").textContent=Reservations.length

function saveArray()
{
  localStorage.setItem("reservations",JSON.stringify(Reservations));
}
function getArray()
{
  let data= JSON.parse(localStorage.getItem("reservations") || "[]")
}

function affichageDetails()
{
  
//ville
let depart=document.getElementById("depart");
depart.textContent=trip.departure;
let destination=document.getElementById("destination");
destination.textContent=trip.destination;
//prix
let prix=document.querySelector(".prix");
prix.textContent=trip.price+ "DH" ;
//horaire
let time=document.querySelector(".horaire");
time.textContent=trip.departureTime+ "→" +trip.arrivalTime;
//placelibre
  let dispo=document.querySelector(".plcDispo")
  dispo.textContent=placesLibres(trip)+"/20 places"
//recette
  let recette = document.querySelector(".chiffreAffaire");

    recette.textContent = trip.reservations.reduce((total, reservation) => {
        return total + prixSiege(Number(trip.price), reservation.seat);
    }, 0).toLocaleString("fr-FR")+ " DH";
}
affichageDetails()

function affichageSieges()
{
      
         Boxes.forEach(siege=>{
             let nbrSiege=siege.querySelector(".siege");
             let nomSiege=siege.querySelector(".nom");
             let phone=siege.querySelector(".phone");
             
            let result=Reservations.find((item)=>{
            return Number(nbrSiege.textContent.trim())===Number(item.seat)    
            })
            if(result)
            {
               nomSiege.textContent=result.name
               phone.textContent=result.phone
               siege.classList.remove("disponible")
               siege.classList.add("reserver")
            }
           
    
} )
} 
affichageSieges()
 RemplirSelectAjouter()
 Remplir()
 RemplirSelectEdit();
 RemplirOfremove()
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // RemplirSelectAjouter()
  // RemplirSelectEdit();
  // RemplirOfremove()
  //  affichageDetails()
  
});

// function Ajouter() {
  let nomPasseger = form.querySelector(".nomPasseger").value.trim(); //input
  let siegeAjouter = form.querySelector(".Siege").value.trim(); //select
  // let placeDisponible = document.getElementById("plcDispo");
  // let chiffreAffaire = Number(
  //   document.getElementById("chiffreAffaire").textContent,
  // );

 

            //  if (nomPasseger === "") {
            //             message.classList.remove("valid");
            //             message.classList.add("error");
            //             message.innerHTML = "Remplir le nom";
            //             messageDisplay(message)
            //           } 
            //  else if (Trouver(nomPasseger)) {
            //             console.log("here");
            //             message.classList.remove("valid");
            //             message.classList.add("error");
            //             message.innerHTML =   "Ce passager deja Existe";
            //             messageDisplay(message)
            //           } 
                      
  
            //  else if (siegeAjouter === "chose") {
            //         console.log("champ siege est vide");
            //         let dispoPlace = Dispo();
            //         if (dispoPlace === undefined) {
            //           console.log("le train est complet");
            //         } else {
            //           // console.log("le siege et :", dispoPlace);

            //           Boxes.forEach(function (siege) {
            //         //recherche sur les boxes
            //         let siegeBox = siege.querySelector(".siege").textContent.trim();
            //         if (dispoPlace === siegeBox) {
            //           let nom = siege.querySelector(".nom");
            //           let option = form.querySelector(
            //             '.Siege option[value="' + dispoPlace + '"]',
            //           );
            //           nom.textContent = nomPasseger;
            //           Reservations.push({
            //             siegeNum: Number(dispoPlace),
            //             Pesrsonne: nomPasseger,
            //           });
            //           saveArray()
            //           document.querySelector(".cout-ticket").textContent=Reservations.length
                
                 
              //         siege.classList.remove("disponible");
              //         siege.classList.add("reserver");
              //         option.style.display = "none";
              //         document.querySelector(".nomPasseger").value = "";
              //         form.querySelector(".Siege").value = "chose";
              //         //affichage de message
              //         message.classList.remove("error");
              //         message.classList.add("valid");
              //         message.innerHTML =   "Reservation bien Enregistrer";
              //          messageDisplay(message)
              //         Remplir();
                      
              //       }
              //     });
              //   }
              // } 
              // else {
              //message validation

            //   Boxes.forEach(function (siege) {
            //     //recherche sur les boxes
            //     let siegeBox = siege.querySelector(".siege").textContent.trim();
            //     if (siegeAjouter === siegeBox) {
            //       let nom = siege.querySelector(".nom");
            //       let option = form.querySelector(
            //         '.Siege option[value="' + siegeAjouter + '"]',
            //       );
            //       nom.textContent = nomPasseger;
            //       Reservations.push({
            //         siegeNum: Number(siegeAjouter),
            //         Pesrsonne: nomPasseger,
            //       });
            //       saveArray()
            //       document.querySelector(".cout-ticket").textContent=Reservations.length
            //       let placesReserver = Reservations.length;
            //        places=20 - placesReserver;
            //       // placeDisponible.innerHTML = places;
            //       // chiffreAffaire += 80;
            //       // document.getElementById("chiffreAffaire").innerHTML = chiffreAffaire;
            //       //save madification at local
            //       localStorage.setItem("placesDisponibles",  places);
            //       // localStorage.setItem("montantTotal", chiffreAffaire);
            //       // document.getElementById("chiffreAffaire").innerHTML = chiffreAffaire;
            //       siege.classList.remove("disponible");
            //       siege.classList.add("reserver");
            //       option.style.display = "none";

            //       document.querySelector(".nomPasseger").value = "";
            //       form.querySelector(".Siege").value = "chose";

            //       //affichage de message
            //       message.classList.remove("error");
            //       message.classList.add("valid");
            //       message.innerHTML ="Reservation bien Enregistrer" ;
            //       // console.log("le squope de ajouter ");
            //       Remplir();
            //       messageDisplay(message)
            //     }
            //   });
            // }

            // message.style.display = "block";
// }

// function Trouver(nom) {
//   let Passager = Reservations.find((ticket) => {
//     return ticket.Pesrsonne.trim().toLowerCase() === nom.trim().toLowerCase();
//   });
//   return Passager;
// }
// function Dispo() { 
  // let place = Array.from(Boxes).find((Dispo) => {
  //   return Dispo.classList.contains("disponible");
  // });
//   if (place === undefined) {
//     return undefined;
//   } else {
//     return place.textContent.trim();
//   }
// }
function Remplir() {
  let Nom_Select = document.getElementById("NomModifier");

  Nom_Select.replaceChildren();

  let option = document.createElement("option");
  option.value = "chose";
  option.textContent = "choisez un nouveau Passager";
  Nom_Select.append(option);
  Reservations.forEach((nom) => {
    let option = document.createElement("option");
    option.value = nom.name;
    option.textContent = nom.name;
    Nom_Select.append(option);
   
  });
}
// function messageDisplay(message)
// {
//                          message.classList.remove("active")
//                          void message.offsetWidth;
//                          message.classList.add("active");
    
// }
function RemplirSelectEdit() {
   const DispoSiege = container.querySelectorAll(".box.disponible");
          
          selectModifier.replaceChildren();

          let option = document.createElement("option");
          option.value = "chose";
          option.textContent = "choisez un nouveau siege";
          selectModifier.append(option);

          DispoSiege.forEach((num) => {
            let sigeNum = num.querySelector(".siege").textContent.trim();
            let option = document.createElement("option");
            option.value = sigeNum;
            option.textContent = sigeNum;
            selectModifier.append(option);
          });

}

function RemplirSelectAjouter()
{
  const DispoSiege = container.querySelectorAll(".box.disponible");
          
          NexSiege.replaceChildren();

          let option = document.createElement("option");
          option.value = "chose";
          option.textContent = "choisez un nouveau siege";
          NexSiege.append(option);

          DispoSiege.forEach((num) => {
            let sigeNum = num.querySelector(".siege").textContent.trim();
            let option = document.createElement("option");
            option.value = sigeNum;
            option.textContent = sigeNum;
            NexSiege.append(option);
          });

}
        formModifier.addEventListener("submit", (e) => {
          e.preventDefault();
          ModifierPassager();
          RemplirOfremove()
        });
// function ModifierPassager() {
  
//                                     // 1. Vérifier le passager choisi
//                       if (nomPassager.value === "chose") {
//                          messageModifier.classList.remove("valid");
//                          messageModifier.classList.add("error");
//                          messageModifier.innerHTML ="Choisis un nom de passager" ;
//                          messageDisplay(messageModifier)
//                          messageModifier.style.display = "block";
//                         return;
//                       }

//                       // 2. Chercher le passager dans Reservations
//                       const index = Reservations.findIndex((ticket) => {
//                         return ticket.Pesrsonne === nomPassager.value;
//                       });

                  
//                       // 3. Vérifier si les deux champs sont vides
//                       if (NewPassager.value.trim() === "" && NewSiege.value === "chose") {
//                          messageModifier.classList.remove("valid");
//                          messageModifier.classList.add("error");
//                          messageModifier.innerHTML ="Les deux champs sont vides" ;
//                          messageModifier.style.display = "block";
//                          messageDisplay(messageModifier)
//                          return;
                        
//                       }
//                       // 4. Modifier le nom si le champ n'est pas vide
//                       if (NewPassager.value.trim() !== "") {
//                         Reservations[index].Pesrsonne = NewPassager.value.trim();
                    
//                       }

//                       // 5. Modifier le siège si un nouveau siège est choisi
//                       if (NewSiege.value !== "chose") {
//                         Reservations[index].siegeNum = Number(NewSiege.value);
//                       }

//                       // 6. Mettre à jour les boxes selon Reservations
//                       Boxes.forEach((box) => {
//                         //nombre de siege sur grid
//                         const numero = Number(
//                           box.querySelector(".siege").textContent.trim()
//                         );
//                         //nom de passager sur grid
//                         const nomBox = box.querySelector(".nom");

//                         const reservation = Reservations.find((ticket) => {
//                           return ticket.siegeNum === numero;
//                         });

//                         if (reservation) {
//                           nomBox.textContent = reservation.Pesrsonne;
//                           box.classList.remove("disponible");
//                           box.classList.add("reserver");
//                         } else {
//                           nomBox.textContent = "";
//                           box.classList.remove("reserver");
//                           box.classList.add("disponible");
//                         }
//                       });

//                       // 7. Actualiser les listes
//                       Remplir();
//                       saveArray()
//                       RemplirSelectEdit();
//                       RemplirSelectAjouter()
//                       // 8. Vider les champs après modification
//                       NewPassager.value = "";
//                       NewSiege.value = "chose";
//                       messageModifier.classList.remove("error");
//                       messageModifier.classList.add("valid");
//                       messageModifier.innerHTML ="Modification réussie" ;
//                       messageModifier.style.display = "block";
//                       messageDisplay(messageModifier)
//                       console.log("table de reservation", Reservations);

                       
// }
       
// RemoveForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   affichageDetails()
//   RemplirOfremove()
// });
          
// //fonction de supprimer 
function RemplirOfremove() {
  

 remove_select.replaceChildren();

  let option = document.createElement("option");
  option.value = "chose";
  option.textContent = "choisez un nouveau Passager";
   remove_select.append(option);
  Reservations.forEach((nom) => {
    let option = document.createElement("option");
    option.value = nom.name;
    option.textContent = nom.name;
    remove_select.append(option);
   
  });
}
// function Supprimer(){
//   //nom choisze pour supprimer 
//    let selectedNom=RemoveForm.querySelector(".RemoveNom").value;
//    console.log("ici pour supprimer")
//    if(selectedNom ==="chose")
//    {
//        messageSupprimer.classList.remove("valid");
//        messageSupprimer.classList.add("error");
//        messageSupprimer.textContent="Voulez-vous choisez un passagez";
//        messageSupprimer.style.display="block";
//        messageDisplay(messageSupprimer)

//    }
//    else
//    {
//         let index=Reservations.findIndex(Passager=>{
//         return Passager.Pesrsonne===selectedNom;
//         }  )
//         Reservations.splice(index,1)
//         saveArray()
//         document.querySelector(".cout-ticket").textContent=Reservations.length
        
//         Boxes.forEach(box=>{
//           let nom=box.querySelector(".nom");
//           if(nom.textContent.trim()===selectedNom)
//           {
//                nom.textContent="";
//                box.classList.remove("reserver");
//                box.classList.add("disponible");
//           }
//         })
//        messageSupprimer.classList.remove("error");
//        messageSupprimer.classList.add("valid");
//        messageSupprimer.textContent="Le passager bien supprimer ";
//        messageSupprimer.style.display="block";  //save madification at local
//        localStorage.setItem("placesDisponibles",  places);
//       //  localStorage.setItem("montantTotal", chiffreAffaire);
       
//        messageDisplay(messageSupprimer)
//         Remplir();
//         saveArray()
//         RemplirSelectAjouter()
//         RemplirSelectEdit();
//         RemplirOfremove();
       
//    }

// }
         
                 
//    //afficher les information d'un boxes a partir le click sur le box 

// container.addEventListener("click",e=>{
//   // console.log("not found")
//       let siege=e.target.closest(".box");
//       if (!siege) return;
//        let Nom =siege.querySelector(".nom").textContent
//        let siegeNbr =siege.querySelector(".siege").textContent.trim()
//        if(Nom!=="" && siegeNbr!=="")
//        {
          
//           nom.value=Nom //select dyal modifier  Nom
//           remove_select.value=Nom//select Supprimer
//        }
//        else
//        {
//         Remplir();
//         RemplirOfremove();
//        }
     
// })

                          
                          
                              
              
                      
//   Boxes.forEach((box) => {
                      
//                         const numero = Number(
//                           box.querySelector(".siege").textContent.trim()
//                         );
                     
//                         const nomBox = box.querySelector(".nom");

//                         const reservation = Reservations.find((ticket) => {
//                           return ticket.siegeNum === numero;
//                         });

//                         if (reservation) {
//                           nomBox.textContent = reservation.Pesrsonne;
//                           box.classList.remove("disponible");
//                           box.classList.add("reserver");
//                         } else {
//                           nomBox.textContent = "";
//                           box.classList.remove("reserver");
//                           box.classList.add("disponible");
//                         }
//                       });

                     
//                       Remplir();
//                       RemplirSelectEdit();
//                       RemplirSelectAjouter()
//                       RemplirOfremove();             
     

/* DRAG & DROP */
let drag = null;

Boxes.forEach(box => {

    box.addEventListener("dragstart", () => {
       const nomBox = box.querySelector(".nom").textContent.trim();

        if (nomBox === "") {
            drag = null;
            return;
        }

        drag = box;
        box.style.opacity = "0.5";
    });

    box.addEventListener("dragend", () => {
        box.style.opacity = "1";
        drag = null;
    });

    box.addEventListener("dragover", e => {
        e.preventDefault();
        box.style.backgroundColor = "rgba(89, 198, 185, 0.3)";
    });

    box.addEventListener("dragleave", () => {
        box.style.backgroundColor = "";
    });

    box.addEventListener("drop", e => {
        e.preventDefault();

        if (!drag || drag === box) return;

        // const nomDepart = drag.querySelector(".nom").textContent.trim();
        const siegeDepart = Number(
            drag.querySelector(".siege").textContent.trim()
        );

        const siegeArrivee = Number(
            box.querySelector(".siege").textContent.trim()
        );

        // On déplace uniquement vers un siège libre
        if (!box.classList.contains("disponible")) {
            box.style.backgroundColor = "";
            return;
        }

        // Trouver la réservation du passager
        const reservation = Reservations.find(ticket =>
            ticket.siegeNum === siegeDepart
        );

        if (!reservation) {
            box.style.backgroundColor = "";
            return;
        }

        // Modifier le numéro du siège dans la réservation
        reservation.siegeNum = siegeArrivee;

        // Sauvegarder les données
        saveArray();

        // Mettre à jour les noms et les couleurs
        Boxes.forEach(s => {
            const numero = Number(
                s.querySelector(".siege").textContent.trim()
            );

            const nom = s.querySelector(".nom");
            const ticket = Reservations.find(r => r.siegeNum === numero);

            nom.textContent = ticket ? ticket.Pesrsonne : "";

            s.classList.toggle("reserver", Boolean(ticket));
            s.classList.toggle("disponible", !ticket);
            s.style.backgroundColor = "";
        });

        // Actualiser les listes des formulaires
        Remplir();
        RemplirSelectEdit();
        RemplirSelectAjouter()
        RemplirOfremove();
    });
});


