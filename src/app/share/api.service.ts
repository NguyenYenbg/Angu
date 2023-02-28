import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  apiurl='http://localhost:3000/company';
  
  Getallcompany():Observable<any[]>{
    return this.http.get<any[]>(this.apiurl);
  }
  
  Createcompany(company:any){
     return this.http.post(this.apiurl, company);
  }

  Updatecompany(id:any, companyData:any){
    return this.http.put(this.apiurl+"/"+id, companyData);
  }

  DeletecompanybyId(id:any){
    return this.http.delete(this.apiurl+"/"+id);
  }
}
