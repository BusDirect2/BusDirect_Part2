export function regex_telephone(inputPhone, trip) {
  let phone = inputPhone.trim();
  let regex_telephone = /^0[567]\d{8}$/;
<<<<<<< HEAD
 
=======
  
>>>>>>> origin/feature/reserver
  if (!regex_telephone.test(phone)) {
    return "le telephone pas valide";
  }
  if (TrouverPhone(inputPhone.trim(), trip)) {
    return "Ce telephone deja Existe";
  }

  return true;
}

export function validerPassager(trip, p) {
<<<<<<< HEAD
 
    if (Trouver(p, trip)) {
=======
   if (Trouver(p, trip)) {
>>>>>>> origin/feature/reserver
    return "Ce passager deja Existe";
  }
  return true;
}
function Trouver(nom, trip) {
  let Passager = trip.find((ticket) => {
    return ticket.name.trim().toLowerCase() === nom.trim().toLowerCase();
  });
  return Passager;
}
function TrouverPhone(phone, trip) {
  let Passager = trip.find((ticket) => {
    return ticket.phone === phone.trim();
  });
  return Passager;
}

