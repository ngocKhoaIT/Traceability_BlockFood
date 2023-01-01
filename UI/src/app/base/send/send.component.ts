import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { NoticeData } from 'src/app/models/noticeData.model';
import { User } from 'src/app/models/user.model';
import { APIservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<SendComponent>, 
    private testService: APIservicesService, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string,
    private _snackBar: MatSnackBar,) { }

    r: any

  ngOnInit() {
    this.testService.getAllUsers()
    .subscribe({
      next: (re) => { 
        this.options = re
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.userName;
            return name ? this._filter(name as string) : this.options.slice();
          }),
        );
      }
    })
  }

  detail: NoticeData = {
    content: '',
    id: '',
    receiveDate: '',
    receiveId: '',
    sendDate: '',
    sendId: '',
    status_request: '',
    title: '',
  }

  add(){
    this.detail.id = '',
    this.detail.sendId = this.data,
    this.detail.receiveId = this.r.userName
    this.detail.receiveDate = '2022-10-11T07:40:25.49',
    this.detail.status_request = 'Đã gửi'
    this.detail.sendDate = '2022-10-11T07:40:25.49'
    this.testService.addNotice(this.detail)
    .subscribe({
      next: (re) => {
        this._snackBar.open('Đã gửi', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        })
        this._bottomSheetRef.dismiss()
      }
    })
  }

  onNoClick(){
    this._bottomSheetRef.dismiss()
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  myControl = new FormControl<string | User>('');
  options: User[] = []
  filteredOptions: Observable<User[]> | undefined;

  

  displayFn(user: User): string {
    return user && user.userName ? user.userName : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.userName.toLowerCase().includes(filterValue));
  }

}
