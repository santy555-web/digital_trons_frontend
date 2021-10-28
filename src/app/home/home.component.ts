
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {formatDate} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag1:boolean=true;
  flag2:boolean=true;
  flag3:boolean=true;
  flag4:boolean=true;
  flag5:boolean=true;
  flag6:boolean=true;
  flag7:boolean=true;
  flag9:boolean=true;
  flag8:boolean=true;
  dateFlag:boolean=true;
  formFlag:boolean=false;
  invalid:boolean=false
  public timeSlotForm: FormGroup;
  today:any;
  tday:any
  arr =[];
  data ={};
  variale_data;
  constructor(private service: AppService,private router:Router) { }

  ngOnInit(): void {
    this.tday=new Date();
    this.timeSlotForm =new FormGroup({
      slot_time : new FormControl(''),
      first_name : new FormControl(''),
      last_name : new FormControl(''),
      mobileNo : new FormControl(''),
      date_now : new FormControl(''),
    });

    registerLocaleData(localeFr, 'fr');
    this.today = formatDate(new Date(), 'd MM yyyy', 'fr');
    this.timeSlotForm.get('date_now').setValue(this.today);
    this.service.getScheduleData().subscribe((data:any)=>{
      Object.assign(this.data, data);
    });
  }


  onSubmitForm(){
    this.service.addSchedule(this.timeSlotForm.value).subscribe((data)=>{
      alert('schedule successfully');
      this.router.navigate(['/all_schedule']);
    });
  }
  onClickNext(){
    this.formFlag =!this.formFlag;
    this.dateFlag=!this.dateFlag;
  }
  salectedInput(event){
    if(event !==null || '')
    {
      this.invalid =true;
    }
  }
}
