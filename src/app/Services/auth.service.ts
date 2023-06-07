import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:7087/api/";

  constructor(private http:HttpClient, private router: Router) {}
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }

  signOut(){
    localStorage.clear();
    Swal.fire({
      title: 'Success!',
      text: "Logout Success!",
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    this.router.navigate(['signin']);
  }

  search(searchObj:any){
    return this.http.post<any[]>(`${this.baseUrl}Search`, searchObj);
  }

  getJourneyById(id:number){
    return this.http.get(`${this.baseUrl}AirlineAuthority/id?id=${id}`);
  }

  bookTicket(bookObj:any){
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Booking`, bookObj, {headers});
  }
}
