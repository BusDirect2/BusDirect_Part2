
export let trajets=[]
export async function async(trajets) {

    trajets=JSON.parse(localStorage.getItem("trajets"))
    if(trajets!== null)
    {
        return trajets
    }
    else
    {
        
    
     try
     {
        const result=await fetch("./data/trips.json")
        trajets=await result.json()
            
        return trajets
     }
     catch
     {
        console.log("data not downloaded")
        return []
     }
    }
}

export function  sauvegarder(trajets) 
{
   localStorage.setItem("trajets",JSON.stringify(trajets))
}
