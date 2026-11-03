
export const test = () => console.log("reservation OK");

export function  placesLibres(trip){
    return trip.capacity-trip.reservations.length
}
export function estComplet(trip)
{
    return placesLibres(trip)===0
}
export function estVIP(siege) {
       return Number(siege)>=1 && Number(siege)<=4
   
}   

export function prixSiege(prix, siege)  {
    if(estVIP(siege))
    {
        prix=Math.round(prix*(1.1))
    }
    
    return prix
}

// export const test = () => console.log("store OK");:
export function recetteTrajet(trip) {
    
}      
export function reserver(trip, p, siege){
    // trip.reservations.array.forEach(element => {
    //     p=element.name;
    //     siege=element.seat;
    // });
}
export function modifier(trip, siege, p){}
export function annuler(trip, siege) {}     
export function inscrireEnAttente(trip, p){}
export function retirerDeAttente(trip, i){}