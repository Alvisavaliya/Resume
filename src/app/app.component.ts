import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import {CustomValidators} from './Validators/noSpaceAllowed.validators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private fb: FormBuilder) { }
 
  title = 'reactive-form';
  reactiveForm:FormGroup;
  formStatus:string;
  formData:any={};
  originalArray = ['C', 'JAVA', 'Angular', 'React', 'MongoDB', 'FireBase'];
  hobbies=['reading','writing','dancing','singing']

  ngOnInit() {
    this.reactiveForm=new FormGroup({
      firstname:new FormControl(null, [Validators.required ,CustomValidators.noSpaceAllowed ]),
      lastname:new FormControl(null , [Validators.required , CustomValidators.noSpaceAllowed]),
      email:new FormControl(null , [Validators.email , Validators.required]), 
      username:new FormControl(null , [Validators.required]),
      Dob:new FormControl(null),
      gender:new FormControl('male'),
          
            address:new FormGroup({
              street:new FormControl(null , Validators.required),
              country:new FormControl('India' , Validators.required),
              city:new FormControl(null),
              region:new FormControl(null),
              postal:new FormControl(null , Validators.required),
            }),

       hobby:new FormArray([],Validators.required),

            Education:new FormArray([

            ]),
            skills:new FormArray([
              
            ]),
            experience:new FormArray([
              
            ])

    })

    // ValueChange ;;--

// this.reactiveForm.get('firstname').valueChanges.subscribe((val)=>
// {
// console.log(val);
// })

//     this.reactiveForm.valueChanges.subscribe((data)=>{
//       console.log(data);
      
//     })


//statusChnged Event
// this.reactiveForm.get('username').statusChanges.subscribe((status)=>
// {
//   console.log(status);
// })


this.reactiveForm.statusChanges.subscribe((status)=>{
  console.log(status);
  this.formStatus=status;
})
}


  onFormSubmitted(){
    console.log(this.reactiveForm.value);
    this.formData=this.reactiveForm.value; 
   console.log(this.reactiveForm.value);
   
    this.reactiveForm.reset({
      firstname:null,
      lastname:null,
      email:null,
      username:null,
      Dob:null,
      gender:'Male',
        address:{
          street:null,
            country: 'India',
            city:null,
            region:null,
             postal:null,
            },
            skills:[null],
            experience:[null],
            Education:[null],
           hobby:[null]
    });
  }

  data() {
    return (this.reactiveForm.get('skills') as FormArray).controls
  }

  educatiofun(){
    return (this.reactiveForm.get('Education') as FormArray).controls
  }
  AddSkills(){
    
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required))
  }
  onChange(event: any): void {

    // const control=new FormControl(null);
    // (<FormArray>this.reactiveForm.get('hobbies')).push(control)
    const hobbyFormArray = this.reactiveForm.get('hobby') as FormArray;

    if (event.target.checked) {
      hobbyFormArray.push(this.fb.control(event.target.value));
    } else {
      const index = hobbyFormArray.controls.findIndex(x => x.value === event.target.value);
      hobbyFormArray.removeAt(index);
    }
  }
  DeleteSkills(index:number){
   
   const control = <FormArray>this.reactiveForm.get('skills')
   control.removeAt(index);
  }

  OnAddEduction(){
    const educatiogrp =new FormGroup({
      clgnm:new FormControl(null),
      education:new FormControl(null),
      percentage:new FormControl(null),
      PassingYear:new FormControl(null)
    });

    (<FormArray>this.reactiveForm.get('Education')).push(educatiogrp)
  }

  onDeleteEdcation(index:number){
    const control=<FormArray>this.reactiveForm.get('Education')
    control.removeAt(index)
  }
  AddExperience(){
    const frmgroup=new FormGroup({
      company:new FormControl(null),
      position:new FormControl(null),
      totalExp:new FormControl(null),
      startdt:new FormControl(null),
      enddt:new FormControl(null),
    });
   (<FormArray>this.reactiveForm.get('experience')).push(frmgroup)
  }

  DeleteExp(index:number){
     const dltExp= <FormArray>this.reactiveForm.get('experience')
    dltExp.removeAt(index)
  }
  expform() {
    return (this.reactiveForm.get('experience') as FormArray).controls
  }


  GenerateUsername(){
    let username='';
    const fname:string =this.reactiveForm.get('firstname').value;
    const lastnm:string=this.reactiveForm.get('lastname').value;
    const Dob:string=this.reactiveForm.get('Dob').value;

    if(fname.length>=3)
    {
      username+=fname.slice(0,3)
    }
    else{
      username += fname;
    }

    if(lastnm.length >=3)
    {
      username+=lastnm.slice(0,3)
    }
    else{
      username += lastnm
    }

    let datetime =new Date(Dob);
    username +=datetime.getFullYear();

    username =username.toLowerCase();
    console.log(username);
    
    // this.reactiveForm.setValue({
      
    //     firstname:this.reactiveForm.get('firstname').value,
    //     lastname:this.reactiveForm.get('lastname').value,
    //     email:this.reactiveForm.get('email').value,
    //     username:username,
    //     Dob:this.reactiveForm.get('Dob').value,
    //     gender:this.reactiveForm.get('gender').value,
    //           address:{
    //             street:this.reactiveForm.get('address.street').value,
    //             country:this.reactiveForm.get('address.country').value,
    //             city:this.reactiveForm.get('address.city').value,
    //             region:this.reactiveForm.get('address.region').value,
    //             postal:this.reactiveForm.get('address.postal').value
    //           },
    //           skills:this.reactiveForm.get('skills').value,
    //           experience:this.reactiveForm.get('experience').value
    //   })

    // this.reactiveForm.get('username').setValue(username)

    this.reactiveForm.patchValue({
      username: username,
      address:{
        city:'Delhi'
      }
    })
  }
  
downloadAsPDF() {
  var data = document.getElementById("userDetail");
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
}
} 
  


