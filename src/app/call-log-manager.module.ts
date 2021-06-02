import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CallLogService } from './call-log-manager/services/calllog.service';
import { CallLogManagerComponent } from './call-log-manager/call-log-manager.component';
import { CallLogEditComponent } from './call-log-manager/call-log-edit/call-log-edit.component';
import { CallLogEditDialogComponent } from './call-log-manager/call-log-edit-dialog/call-log-edit-dialog.component';
import { CallLogListComponent } from './call-log-manager/call-log-list/call-log-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, FormsModule, MDBBootstrapModule.forRoot(), MaterialModule],
  declarations: [
    CallLogManagerComponent,
    CallLogListComponent,
    CallLogEditComponent,
    CallLogEditDialogComponent
  ],
  providers: [CallLogService],
  entryComponents: [CallLogEditDialogComponent],
  exports: [CallLogManagerComponent]
})
export class CallLogManagerModule {}
