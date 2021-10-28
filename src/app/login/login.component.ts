import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register:boolean =false;
  login:boolean =true;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  constructor(private service:AppService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email : new FormControl('', [Validators.required,Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
    this.registerForm =new FormGroup({
      name:new FormControl(''),
      email : new FormControl('', [Validators.required,Validators.email]),
      mobileNo:new FormControl(''),
      password : new FormControl('', [Validators.required]),
    });
  }
  onClickRegister(){
    this.service.register(this.registerForm.value).subscribe((data)=>{
      alert('register successfully');
      this.register = false;
      this.login = true;
    });
  }
  onClickData(){
    this.register = true;
    this.login = false;
  }
  onClickLogin(){
    this.service.login(this.loginForm.value).subscribe((data)=>{
      alert('login successfully');
      localStorage.setItem('userId',this.loginForm.value);
      this.router.navigate(['/home']);
    });
  }
}
