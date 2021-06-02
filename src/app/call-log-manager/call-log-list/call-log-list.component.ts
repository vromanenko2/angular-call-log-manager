import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { CallLogService } from './../services/calllog.service';
import { CallLog } from './../models/calllog.type';
import { SearchResult } from './../models/search-result.type';
import { CallLogEditDialogComponent } from './../call-log-edit-dialog/call-log-edit-dialog.component';

@Component({
  selector: 'app-call-log-list',
  templateUrl: 'call-log-list.component.html',
  styleUrls: ['call-log-list.component.css']
})
export class CallLogListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'user',
    'title',
    'status',
    'action'
  ];
  callLogItems: CallLog[];
  callLogItemsLength: Number;
  callLogService: CallLogService;
  searchInput: string;
  onlyOpen: boolean = false;
  pageEvent: PageEvent;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(public dialog: MatDialog, callLogService: CallLogService) {
    this.callLogService = callLogService;
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    if (this.pageEvent) {
      this.pageNumber = this.pageEvent.pageIndex + 1;
    }
    const searchResult: SearchResult<CallLog> = this.callLogService.getItems(
      this.pageSize,
      this.pageNumber,
      this.onlyOpen,
      this.searchInput
    );
    this.callLogItems = searchResult.data;
    this.callLogItemsLength = searchResult.count;
  }

  openEditForm(callLogId: number): void {
    const dialogRef: MatDialogRef<CallLogEditDialogComponent> = this.dialog.open(CallLogEditDialogComponent, {
      width: '1000px',
      data: callLogId
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === true){
        this.search();
      } 
    });
  }
}
