import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AppService{
  url=environment.api_URL;
  constructor(private http:HttpClient) { }
  getScheduleData(){
    return this.http.get(this.url + `/schedule`);
  }
  EditScheduleData(data){
    return this.http.put(this.url + `/schedule`, data);
  }
  getFormById(id){
    return this.http.get(this.url + `/schedule/${id}`);
  }
  addSchedule(data){
    return this.http.post(this.url + `/schedule`, data);
  }
  login(data){
    return this.http.post(this.url +`/register`, data);
  }
  register(data){
    return this.http.post(this.url+`/register`, data);
   }
}
