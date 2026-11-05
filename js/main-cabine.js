import { async, trajets, sauvegarder } from "./store.js";
import { regex_telephone, validerPassager } from "./validators.js";
import {
  estComplet,
  estVIP,
  placesLibres,
  prixSiege,
  inscrireEnAttente,
  retirerDeAttente
} from "./reservations.js";
import { renderListeAttente } from "./render.js";
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

const Reservations = trip.reservations;

//affichage des inforamtions d'un boxes
const container = document.querySelector(".countainer-Box");
const NexSiege = document.querySelector(".Siege");
const NomModifier = document.querySelector("#NomModifier");
const Boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");
let messagePhone = document.querySelector(".messagePhone");
let messageNom = document.querySelector(".messageNom");
const messageModifier = document.querySelector(".messageModifier");
const formModifier = document.querySelector(".EditForm");
const selectModifier = document.getElementById("newSeat");
const form = document.querySelector(".Ajouter-form");

const NewSiege = document.getElementById("newSeat");
const messageSupprimer = document.querySelector(".messageSupprimer");
const RemoveForm = document.querySelector(".SupprimerForm");
const remove_select = document.querySelector(".RemoveNom");
let champsAjouter = document.querySelector(".champs");
let tableList = document.querySelector(".listeTable");
let ListForm = document.querySelector(".listAttente-form fieldset");
document.querySelector(".cout-ticket").textContent = Reservations.length;

function saveArray() {
  sauvegarder(trips);
}

function affichageDetails() {
  //ville
  let depart = document.getElementById("depart");
  depart.textContent = trip.departure;
  let destination = document.getElementById("destination");
  destination.textContent = trip.destination;

  //prix
  let prix = document.querySelector(".prix");
  prix.textContent = trip.price + "DH";
  //horaire
  let time = document.querySelector(".horaire");
  time.textContent = trip.departureTime + "→" + trip.arrivalTime;
  //placelibre
  let dispo = placesLibres(trip);
  document.querySelector(".plcDispo").textContent = dispo + "/20 places";
  //recette
  let recette = trip.reservations.reduce((total, reservation) => {
    return total + prixSiege(Number(trip.price), reservation.seat);
  }, 0);
  document.querySelector(".chiffreAffaire").textContent =
    recette.toLocaleString("fr-FR") + " DH";
    document.querySelector(".cout-ticket").textContent = Reservations.length;

}

function affichageSieges() {
  Boxes.forEach((siege) => {
    let nbrSiege = siege.querySelector(".siege");
    let nomSiege = siege.querySelector(".nom");
    let phone = siege.querySelector(".phone");

    let result = Reservations.find((item) => {
      return Number(nbrSiege.textContent.trim()) === Number(item.seat);
    });
    if (result) {
      nomSiege.textContent = result.name;
      phone.textContent = result.phone;
      siege.classList.remove("disponible");
      siege.classList.add("reserver");
    }
  });
}
affichageSieges();
affichageDetails();
RemplirSelectAjouter();
Remplir();
RemplirSelectEdit();
RemplirOfremove();
waitingList();

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
window.Ajouter = Ajouter;
function Ajouter() {
  let nomPasseger = form.querySelector(".nomPasseger").value.trim(); //input
  let phonePasseger = form.querySelector(".phone").value.trim(); //input
  let siegeAjouter = form.querySelector(".Siege").value.trim(); //select

  let resultNom = validerPassager(Reservations, nomPasseger);
  let resultphone = regex_telephone(phonePasseger, Reservations);
  if (nomPasseger === "") {
    messageNom.textContent = "Saisir le nom de passager";
    messageNom.classList.remove("hidden");
    messageNom.classList.add("error");
    messageDisplay(messageNom);
  }
  if (resultNom != true && nomPasseger !== "") {
    messageNom.textContent = resultNom;
    messageNom.classList.remove("hidden");
    messageNom.classList.add("error");
    messageDisplay(messageNom);
  }
  if (phonePasseger === "") {
    messagePhone.textContent = "Entrer le numero de telephone";
    messagePhone.classList.remove("hidden");
    messagePhone.classList.add("error");
    messageDisplay(messagePhone);
  }
  if (resultphone != true && phonePasseger !== "") {
    messagePhone.textContent = resultphone;
    messagePhone.classList.remove("hidden");
    messagePhone.classList.add("error");
    messageDisplay(messagePhone);
  } else {
    if (resultNom == true && resultphone == true) {
      if (estComplet(trip)) {
        message.classList.remove("valid");
        message.classList.add("error");
        message.classList.remove("hidden");
        message.innerHTML = "le train est complet";
        messageDisplay(message);
      }
      if (siegeAjouter === "chose") {
        //condition dyal ila champs khawi isayfto lhadik li dsiponible ms machi vip
        let place = Array.from(Boxes).find((box) => {
          return (
            !box.classList.contains("vip") &&
            !box.classList.contains("reserver")
          );
        });
        let numseat = place.querySelector(".siege").textContent.trim();
        let nom = place.querySelector(".nom");
        let phone = place.querySelector(".phone");

        nom.textContent = nomPasseger;
        phone.textContent = phonePasseger;
        Reservations.push({
          seat: numseat,
          name: nomPasseger,
          phone: phonePasseger,
        });
        affichageDetails();

        document.querySelector(".cout-ticket").textContent =
          Reservations.length;
        saveArray();
        place.classList.remove("disponible");
        place.classList.add("reserver");

        form.querySelector(".nomPasseger").value = "";
        form.querySelector(".phone").value = "";
        form.querySelector(".Siege").value = "chose";

        //affichage de message
        message.classList.remove("error");
        message.classList.add("valid");
        message.classList.remove("hidden");
        message.innerHTML = "Reservation bien Enregistrer";
        Remplir();
        RemplirOfremove();
        messageDisplay(message);
        waitingList();
      } else {
        Boxes.forEach(function (siege) {
          //recherche sur les boxes
          let siegeBox = siege.querySelector(".siege").textContent.trim();
          if (siegeAjouter === siegeBox) {
            let nom = siege.querySelector(".nom");
            let phone = siege.querySelector(".phone");

            nom.textContent = nomPasseger;
            phone.textContent = phonePasseger;
            Reservations.push({
              seat: siegeAjouter,
              name: nomPasseger,
              phone: phonePasseger,
            });

            affichageDetails();

            document.querySelector(".cout-ticket").textContent =
              Reservations.length;
            saveArray();
            siege.classList.remove("disponible");
            siege.classList.add("reserver");

            form.querySelector(".nomPasseger").value = "";
            form.querySelector(".phone").value = "";
            form.querySelector(".Siege").value = "chose";

            //affichage de message
            message.classList.remove("error");
            message.classList.add("valid");
            message.classList.remove("hidden");
            message.innerHTML = "Reservation bien Enregistrer";
            Remplir();
            RemplirOfremove();
            messageDisplay(message);
            waitingList();
          }
        });
      }
    }
  }
}

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
    option.textContent = estVIP(sigeNum)
      ? `${sigeNum}-VIP-${prixSiege(Number(trip.price), sigeNum)} DH`
      : sigeNum;
    selectModifier.append(option);
  });
}

function RemplirSelectAjouter() {
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
    option.textContent = estVIP(sigeNum)
      ? `${sigeNum}-VIP-${prixSiege(Number(trip.price), sigeNum)} DH`
      : sigeNum;
    NexSiege.append(option);
  });
}
function messageDisplay(message) {
  message.classList.remove("active");
  void message.offsetWidth;
  message.classList.add("active");
}

formModifier.addEventListener("submit", (e) => {
  e.preventDefault();
  RemplirOfremove();
});
window.ModifierPassager = ModifierPassager;
function ModifierPassager() {
  let messageOfName = document.querySelector(".msgNameEdit");
  let msgNewName = document.querySelector(".msgNewName");
  let msgNewPhone = document.querySelector(".msgNewPhone");
  let NouveauNom = document.getElementById("NouveauNom").value.trim();
  let NouveauPhone = document.getElementById("NouveauPhone").value.trim();

  // 1. Vérifier le passager choisi
  if (NomModifier.value === "chose") {
    messageOfName.classList.remove("valid");
    messageOfName.classList.add("error");
    messageOfName.textContent = "choisir un passager";
    messageDisplay(messageOfName);
    messageOfName.style.display = "block";
    return;
  } else {
    // 2. Chercher le passager dans Reservations
    const index = Reservations.findIndex((ticket) => {
      return ticket.name === NomModifier.value;
    });

    // 3. Vérifier si les deux champs sont vides
    // &&NewSiege.value === "chose"
    if (
      NouveauNom === "" &&
      NouveauPhone === "" &&
      NewSiege.value === "chose"
    ) {
      messageModifier.classList.remove("valid");
      messageModifier.classList.add("error");
      messageModifier.innerHTML = "Les champs sont vides";
      messageModifier.style.display = "block";
      messageDisplay(messageModifier);
    } else {
      let resultNom = validerPassager(Reservations, NouveauNom);
      let resultphone = regex_telephone(NouveauPhone, Reservations);

      // 4. Modifier le nom si le champ n'est pas vide
      //a.si il est deja existe

      if (resultNom != true && NouveauNom !== "") {
        msgNewName.textContent = resultNom;
        msgNewName.classList.remove("hidden");
        msgNewName.classList.add("error");
        messageDisplay(msgNewName);
        msgNewName.style.display = "block";
      }

      if (resultphone != true && NouveauPhone !== "") {
        msgNewPhone.textContent = resultphone;
        msgNewPhone.classList.remove("hidden");
        msgNewPhone.classList.add("error");
        messageDisplay(msgNewPhone);
        msgNewPhone.style.display = "block";
      }
      if (
        (resultphone != true && NouveauPhone !== "") ||
        (resultNom != true && NouveauNom !== "")
      ) {
        return;
      }

      if (NouveauNom !== "") {
        Reservations[index].name = NouveauNom;
      }
      if (NouveauPhone !== "") {
        Reservations[index].phone = NouveauPhone;
      }
      if (NewSiege.value !== "chose") {
        Reservations[index].seat = Number(NewSiege.value);
      }

      // 6. Mettre à jour les boxes selon Reservations
      Boxes.forEach((box) => {
        //nombre de siege sur grid
        const numero = Number(box.querySelector(".siege").textContent.trim());

        // nom de passager sur grid
        const nomBox = box.querySelector(".nom");
        const phoneBox = box.querySelector(".phone");

        const reservation = Reservations.find((ticket) => {
          return ticket.seat === numero;
        });

        if (reservation) {
          nomBox.textContent = reservation.name;
          phoneBox.textContent = reservation.phone;
          box.classList.remove("disponible");
          box.classList.add("reserver");
        } else {
          nomBox.textContent = "";
          phoneBox.textContent = "";
          box.classList.remove("reserver");
          box.classList.add("disponible");
        }
      });
      //  7. Actualiser les listes
      saveArray();
      Remplir();
      RemplirSelectEdit();
      RemplirSelectAjouter();
      affichageDetails();
      // 8. Vider les champs après modification
      document.getElementById("NouveauNom").value = "";
      document.getElementById("NouveauPhone").value = "";
      NewSiege.value = "chose";
      messageModifier.classList.remove("error");
      messageModifier.classList.add("valid");
      messageModifier.innerHTML = "Modification réussie";
      messageModifier.style.display = "block";
      messageDisplay(messageModifier);
      console.table(Reservations);
    }
  }
}

RemoveForm.addEventListener("submit", function (e) {
  e.preventDefault();
  affichageDetails();
  RemplirOfremove();
  Remplir();
  RemplirSelectAjouter();
  RemplirSelectEdit();
});

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

window.Supprimer = Supprimer;
function Supprimer() {
  //nom choisze pour supprimer
  let selectedNom = RemoveForm.querySelector(".RemoveNom").value;
  if (selectedNom === "chose") {
    messageSupprimer.classList.remove("valid");
    messageSupprimer.classList.add("error");
    messageSupprimer.textContent = "Voulez-vous choisez un passagez";
    messageSupprimer.style.display = "block";
    messageDisplay(messageSupprimer);
  } else {
    let index = Reservations.findIndex((Passager) => {
      return Passager.name === selectedNom;
    });
    Reservations.splice(index, 1);
 
          Boxes.forEach((box) => {
          let siege =Number(box.querySelector(".siege").textContent.trim()) ;
          let nom = box.querySelector(".nom");
          let phone = box.querySelector(".phone");
          if (nom.textContent.trim() === selectedNom) {
               if(listAttente.length>0)
                {
                  let WaitPassager=listAttente[0].name;
                  let WaitPhone=listAttente[0].phone;
                  console.log("tu peaux l ajoute ici :");
                  console.log("seat:",siege);
                  console.log("nom:",WaitPassager);
                  console.log("phone:",WaitPhone);
                  nom.textContent=WaitPassager;
                  phone.textContent=WaitPhone
                 
                  listAttente.splice(0,1)
                
                  Reservations.push({
                     seat: siege,
                      name: WaitPassager,
                      phone: WaitPhone,
                    
                  })
                   let button=document.querySelector(".close")
                   let model=document.querySelector("#modal")
                   let showMsg=document.querySelector(".showMsg")
                 setTimeout(() => {
                  
                   model.classList.remove("hidden")
                   showMsg.textContent=`"${WaitPassager}"  a obtenu le siège : ${siege}`
                
                  
                 }, 2000);
                    button.addEventListener("click",()=>{
                       model.classList.add("hidden")
                       showMsg.textContent=""
                   })

                }
                else
                {
                    nom.textContent = "";
                    phone.textContent = "";
                    box.classList.remove("reserver");
                    box.classList.add("disponible");
                }
              
          
          }
        });
        messageSupprimer.classList.remove("error");
        messageSupprimer.classList.add("valid");
        messageSupprimer.textContent = "Le passager bien supprimer ";
        messageSupprimer.style.display = "block";
        messageDisplay(messageSupprimer);
        waitingList();
        saveArray()
        affichageDetails()
       
    }

   
  }


//afficher les information d'un boxes a partir le click sur le box

container.addEventListener("click", (e) => {
  let siege = e.target.closest(".box");
  if (!siege) return;
  let Nom = siege.querySelector(".nom").textContent;
  let siegeNbr = siege.querySelector(".siege").textContent.trim();
  if (Nom !== "" && siegeNbr !== "") {
    NomModifier.value = Nom; //select dyal modifier  Nom
    remove_select.value = Nom; //select Supprimer
  } else {
    Remplir();
    RemplirOfremove();
  }
});

// Boxes.forEach((box) => {

//                       const numero = Number(
//                         box.querySelector(".siege").textContent.trim()
//                       );

//                       const nomBox = box.querySelector(".nom");

//                       const reservation = Reservations.find((ticket) => {
//                         return ticket.siegeNum === numero;
//                       });

//                       if (reservation) {
//                         nomBox.textContent = reservation.Pesrsonne;
//                         box.classList.remove("disponible");
//                         box.classList.add("reserver");
//                       } else {
//                         nomBox.textContent = "";
//                         box.classList.remove("reserver");
//                         box.classList.add("disponible");
//                       }
//                     });

// Remplir();
// RemplirSelectEdit();
// RemplirSelectAjouter()
// RemplirOfremove();

/* DRAG & DROP */
let drag = null;

Boxes.forEach((box) => {
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

  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.style.backgroundColor = "rgba(89, 198, 185, 0.3)";
  });

  box.addEventListener("dragleave", () => {
    box.style.backgroundColor = "";
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();

    if (!drag || drag === box) return;

    // const nomDepart = drag.querySelector(".nom").textContent.trim();
    const siegeDepart = Number(drag.querySelector(".siege").textContent.trim());

    const siegeArrivee = Number(box.querySelector(".siege").textContent.trim());

    // On déplace uniquement vers un siège libre
    if (!box.classList.contains("disponible")) {
      box.style.backgroundColor = "";
      return;
    }

    // Trouver la réservation du passager
    const reservation = Reservations.find(
      (ticket) => ticket.siegeNum === siegeDepart,
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
    Boxes.forEach((s) => {
      const numero = Number(s.querySelector(".siege").textContent.trim());

      const nom = s.querySelector(".nom");
      const ticket = Reservations.find((r) => r.siegeNum === numero);

      nom.textContent = ticket ? ticket.Pesrsonne : "";

      s.classList.toggle("reserver", Boolean(ticket));
      s.classList.toggle("disponible", !ticket);
      s.style.backgroundColor = "";
    });

    // Actualiser les listes des formulaires
    Remplir();
    RemplirSelectEdit();
    RemplirSelectAjouter();
    RemplirOfremove();
  });
});

function waitingList() {
  if (estComplet(trip)) {
    //  console.log("trajet complter")
    //ajouter form
    champsAjouter.disabled = true;
    form.style.opacity = "0.5";
    //
    tableList.classList.remove("hidden");
    ListForm.disabled = false;
    ListForm.style.opacity = "1";
    //  tableList.classList.remove("hidden")
    renderListeAttente(trip, tableList);
  } else {
    console.log("trajet pas complter");
    tableList.classList.add("hidden");
    ListForm.disabled = true;
    ListForm.style.opacity = "0.5";
    // console.log("trajet complter")
    champsAjouter.disabled = false;
    form.style.opacity = "1";
  }
}
//remplir la liste attente

//ajouter un passager dans le liste attente

let formWait = document.querySelector(".listAttente-form");
formWait.addEventListener("submit", (e) => {
  e.preventDefault();
});
window.AjouterAttente = AjouterAttente;
 let listAttente = trip.waitingList;
function AjouterAttente() {
 
  let nom = document.getElementById("nomWait").value.trim();
  let phone = document.getElementById("phoneWait").value.trim();
  let resultNom = validerPassager(listAttente, nom);
  let resultNom2 = validerPassager(Reservations, nom);
  let resultphone = regex_telephone(phone, listAttente);
  let resultphone2 = regex_telephone(phone, Reservations);
  let messageNom = document.querySelector(".messageNomWait");
  let messagephone = document.querySelector(".messagePhoneWait");
  let messageWait = document.querySelector(".messageWait");
  console.table(listAttente);
  if (nom === "") {
    messageNom.textContent = "Saisir le nom de passager";
    messageNom.classList.remove("hidden");
    messageNom.classList.add("error");
    messageDisplay(messageNom);
  }
  if (resultNom != true && nom !== "") {
    messageNom.textContent = resultNom;
    messageNom.classList.remove("hidden");
    messageNom.classList.add("error");
    messageDisplay(messageNom);

    //  console.log("founded")
  }
   if (resultNom2 != true && nom !== "") {
    messageNom.textContent = "Ce passager deja trouver dans les reservations";
    messageNom.classList.remove("hidden");
    messageNom.classList.add("error");
    messageDisplay(messageNom);

    //  console.log("founded")
  }
  if (phone === "") {
    messagephone.textContent = "Saisir le telephone de passager";
    messagephone.classList.remove("hidden");
    messagephone.classList.add("error");
    messageDisplay(messagephone);
  }
  if (resultphone2 != true && phone !== "") {
    messagephone.textContent = "Ce numero  deja trouver dans les reservations";
    messagephone.classList.remove("hidden");
    messagephone.classList.add("error");
    messageDisplay(messagephone);

   
  }
   if (resultphone != true && phone !== "") {
    messagephone.textContent = resultphone;
    messagephone.classList.remove("hidden");
    messagephone.classList.add("error");
    messageDisplay(messagephone);

   
  }
  if (
    (resultphone != true && phone !== "") ||
    (resultNom != true && nom !== "")||
    (resultNom2 != true && nom !== "")||
    (resultphone2 != true && phone !== "")
  ) {
    return;
  }
  if (resultNom == true && resultphone == true && resultNom2==true) {
    let passager = {
      name: nom,
      phone: phone,
    };
    inscrireEnAttente(trip, passager);
    waitingList();
    saveArray();
    messageWait.classList.remove("error");
    messageWait.classList.add("valid");
    messageWait.classList.remove("hidden");
    messageWait.innerHTML = "Reservation bien Enregistrer";
    document.getElementById("nomWait").value=""
    document.getElementById("phoneWait").value=""
    messageDisplay(messageWait);
  }
}


//remove passager from waitinglist
// let li=document.querySelectorAll("")
tableList.addEventListener("click", (e) => {
  let btn = e.target.closest(".btn");
       let  index=btn.dataset.index
          retirerDeAttente(trip, index)
          saveArray()
          waitingList()
  })
 
 
