import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = environment.baseApiUrl
  constructor(private http: HttpClient) {

  }
  proccedLogin(usercred: any){
    return this.http.post(this.baseApiUrl+'api/Accounts/LoginUser',usercred)
  }

  proccedRegister(usercred: any){
    return this.http.post(this.baseApiUrl+'api/Accounts/Register',usercred)
  }

  checkUser(id : string){
    return this.http.get(this.baseApiUrl+'api/Accounts/checkUser/' + id)
  }

  //Đổi mật khẩu
  changePassword(id: string, pw: string){
    return this.http.get(this.baseApiUrl + "api/Accounts/changePassword/"+id+","+pw)
  }

  IsLoggedIn(){
    return localStorage.getItem('token') !=null
  }
  GetToken(){
    return localStorage.getItem('token') || ''
  }
  HaveAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'admin')
    {
      return true
    }
    return false
  }
  
  FarmAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'farm')
    {
      return true
    }
    return false
  }

  FactoryAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'factory')
    {
      return true
    }
    return false
  }

  TransportAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'transport')
    {
      return true
    }
    return false
  }

  MerchantAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'merchant')
    {
      return true
    }
    return false
  }

  StoreAccess(){
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    if(_finaldata.Role == 'store')
    {
      return true
    }
    return false
  }
}
