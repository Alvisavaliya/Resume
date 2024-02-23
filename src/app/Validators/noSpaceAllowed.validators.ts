import { AbstractControl, FormControl } from "@angular/forms";


export class CustomValidators{
    static noSpaceAllowed= (control:FormControl)=>
    {
    if(control.value !=null && control.value.indexOf(' ')!=-1){
        return {noSpaceAllowed:true}
    }
    return null;

    }
    static checkUsername(controls:AbstractControl):Promise<any>{
        return userNameAllowed(controls.value)
    }

}
// async validators
function userNameAllowed (username:string){
    const takenUserNames=['alvi','aayush','bhargav']


    return new Promise((resolve,reject)=>
    {
            setTimeout(()=>
            {
                if(takenUserNames.includes(username)){
                    resolve({checkUsername:true})
                }
                else
                {
                    resolve(null);
                }
            },5000)
    })
} 