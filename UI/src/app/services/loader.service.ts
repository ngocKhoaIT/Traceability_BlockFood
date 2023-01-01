import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(@Inject(LOCALE_ID) public locale: string) { }

  changeFormatDate(id: string){
    if(id === '')
      return ""
    else return formatDate(id,'dd/MM/yyyy',this.locale)
  }

  changeFormatDateTime(id: string){
    if(id === '')
      return ""
    else return formatDate(id,'dd/MM/yyyy hh:mm:ss',this.locale)
  }
}
