import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-notice-delete',
    templateUrl: 'notice-delete.html',
    styleUrls: ['./notice-delete.scss']
})
export class NoticeDelete {

    delete: string

    constructor(public dialogRef: MatDialogRef<NoticeDelete>,
        @Inject(MAT_DIALOG_DATA) public data: string){
            this.delete = 'Yes'
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}