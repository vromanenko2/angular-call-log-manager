import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-call-log-edit-dialog',
  templateUrl: './call-log-edit-dialog.component.html',
  styleUrls: ['./call-log-edit-dialog.component.css']
})
export class CallLogEditDialogComponent implements OnInit {
  editedCallLogId: number;

  constructor(
    public dialogRef: MatDialogRef<CallLogEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.editedCallLogId = data;
  }

  ngOnInit() {}

  close(doUpdate: boolean): void {
    if(doUpdate === true){
      setTimeout(() => { this.dialogRef.close(doUpdate); }, 1000);
    } else {
      this.dialogRef.close(doUpdate);
    }
  }
}
