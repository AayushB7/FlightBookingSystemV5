import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = "";
  password: string = "";

  constructor(private auth:AuthService, private router:Router){ }

  // ngOnInit():void{
  //   // this.loginForm=this.fb.group({

  //   // });
  // }
  

  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email.trim() == "" || this.password.trim() == "") {
      // alert("Please Enter All The Details!");
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter All The Details!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.password="";
    }
    else if (!this.email.trim().match(mailformat)) {
      // alert("Please Enter a Valid Email ID!");
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter a Valid Email ID!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.password="";
    }
    else {
      console.log(this.email + " " + this.password);
      this.auth.login({email:this.email.trim(), password:this.password.trim()}).subscribe({
        next:(res)=>{
          this.email="";
          this.password="";
          this.auth.setToken(res.token);
          Swal.fire({
            title: 'Success!',
            text: 'Login Successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['home']);
        },
        error:(err)=>{
          // alert(err?.error.message);
          Swal.fire({
            title: 'Error!',
            text: err?.error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

  hideShowPass(){

  }
}
