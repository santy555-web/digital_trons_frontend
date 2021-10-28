import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { BasicForm } from './basicForm';
import {formatDate} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-all-schedule',
  templateUrl: './all-schedule.component.html',
  styleUrls: ['./all-schedule.component.css']
})
export class AllScheduleComponent implements OnInit {
    data =[];
    edit:boolean=false;
    showItem:boolean =true;
    public EditForm: FormGroup;
    today;
  constructor(private service:AppService, private router:Router) { }

  ngOnInit(): void {
    this.service.getScheduleData().subscribe((data)=>{
    this.data.push(data);
    });
    this.EditForm= new FormGroup ({
      id: new  FormControl(),
      first_name: new  FormControl('', [Validators.required]),
      last_name: new  FormControl('', [Validators.required]),
      date_now: new  FormControl(),
      slot_time: new  FormControl('', [Validators.required]),
      mobileNo: new  FormControl('', [Validators.required])
    });

  }
  onEditClick(item)
    {
      registerLocaleData(localeFr, 'fr');
      this.today = formatDate(new Date(), 'd MM yyyy', 'fr');
      this.EditForm.get('date_now').setValue(this.today);
       this.service.getFormById(item.id).subscribe((x:BasicForm[]) => {
       this.EditForm.patchValue({
        id:x[0].id,
        first_name:x[0].first_name,
        last_name:x[0].last_name,
        date_now: x[0].date_now,
        slot_time: x[0].slot_time,
        mobileNo:x[0].mobileNo
      });
     })
      this.showItem =false;
      this.edit = true;
    }
    onEditForm(){
       this.service.EditScheduleData(this.EditForm.value).subscribe((x) => {
         alert("Edited Successfully!...");
         this.data=[];
         this.service.getScheduleData().subscribe((data)=>{
          this.data.push(data);
          });
        });
        this.showItem =true;
        this.edit = false;
    }

}
