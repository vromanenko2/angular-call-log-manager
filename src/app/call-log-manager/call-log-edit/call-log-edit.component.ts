import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CallLogService } from './../services/calllog.service';
import { CallLog } from './../models/calllog.type';
import { Status } from './../models/status.type';
import { StatusId } from '../models/status-id.enum';
import { NgModel } from '@angular/forms';
import { message } from './../constants/message.constant';

@Component({
  selector: 'app-call-log-edit',
  templateUrl: './call-log-edit.component.html',
  styleUrls: ['./call-log-edit.component.css']
})
export class CallLogEditComponent implements OnInit {
  @Input() callLogId: number = 0;

  @Output() callLogItemIsSaved: EventEmitter<void> = new EventEmitter();
  @Output() callLogItemIsCancelled: EventEmitter<void> = new EventEmitter();

  @ViewChild('user') userControl: NgModel;
  @ViewChild('title') titleControl: NgModel;
  @ViewChild('problem') problemControl: NgModel;

  statuses: Status[] = [];
  callLogService: CallLogService;
  callLogItem: CallLog;

  validationErrorMessages: string[] = [];
  notificationMessages: string[] = [];
  errorMessages: string[] = [];

  constructor(callLogService: CallLogService) {
    this.callLogService = callLogService;
  }

  ngOnInit() {
    this.statuses = this.callLogService.getStatuses();
    this.callLogItem = this.callLogService.getById(this.callLogId);
  }

  onChangeStatus(statusId: number): void {
    this.validationErrorMessages = [];
    this.validateStatus(statusId);

    const newStatus: Status = this.callLogService.getStatus(statusId);
    this.callLogItem.status = newStatus;
  }

  validateStatus(newStatusId: number): void {
    if (newStatusId == StatusId.Resolved) {
      if (
        !this.callLogItem.solution ||
        this.callLogItem.solution.trim().length == 0
      ) {
        this.validationErrorMessages.push(message.canNotSetResolvedWithoutSolution);
      }
    }

    if (newStatusId == StatusId.Closed) {
      if (
        !this.callLogItem.problem ||
        this.callLogItem.problem.trim().length == 0
      ) {
        this.validationErrorMessages.push(message.canNotSetClosedWithoutProblem);
      }

      if (
        !this.callLogItem.solution ||
        this.callLogItem.solution.trim().length == 0
      ) {
        this.validationErrorMessages.push(message.canNotSetClosedWithoutSolution);
      }
    }
  }

  validateRequired(): boolean {

    let result = true;

    if(this.userControl.invalid === true) {
      this.userControl.control.markAsTouched();
      result = false;
    }

    if(this.titleControl.invalid === true) {
      this.titleControl.control.markAsTouched();
      result = false
    }

    if(this.problemControl.invalid === true) {
      this.problemControl.control.markAsTouched();
      result = false;
    }

    return result;
  }

  save(): void {
    this.validationErrorMessages = [];
    this.notificationMessages = [];
    this.errorMessages = [];
    
    if(this.validateRequired()){
      this.validateStatus(this.callLogItem.status.id);

      if(this.validationErrorMessages.length == 0){
        if (this.callLogService.save(this.callLogItem)) {
          this.notificationMessages.push(message.saveSuccess);
          this.callLogItemIsSaved.emit(null);
          this.callLogItem = this.callLogService.createObject();
          this.setRequiredControlsUntouched();
        } else {
          this.errorMessages.push(message.saveError);
        }
      }
    }
  }

  cancel(): void {
    this.notificationMessages = [];
    this.errorMessages = [];
    this.validationErrorMessages = [];

    this.callLogItem = this.callLogService.createObject();
    this.setRequiredControlsUntouched();
    this.callLogItemIsCancelled.emit();
  }

  setRequiredControlsUntouched(): void {
    if(this.userControl){
      this.userControl.control.markAsUntouched();
    }

    if(this.titleControl){
      this.titleControl.control.markAsUntouched();
    }

    if(this.problemControl){
      this.problemControl.control.markAsUntouched();
    }
  }

  closeNotificationAlert(element: any, message: string): void {
    if(this.closeAlert(element)){
      const index: number = this.notificationMessages.indexOf(message);
      if(index >= 0){
        this.notificationMessages.splice(index, 1);
      }
    }
  }

  closeErrorAlert(element: any, message: string): void {
    if(this.closeAlert(element)){
      const index: number = this.errorMessages.indexOf(message);
      if(index >= 0){
        this.errorMessages.splice(index, 1);
      }
    }
  }

  closeValidationAlert(element: any, message: string): void {
    if(this.closeAlert(element)){
      const index: number = this.validationErrorMessages.indexOf(message);
      if(index >= 0){
        this.validationErrorMessages.splice(index, 1);
      }
    }
  }

  closeAlert(element: any): boolean {
    if(element && element.parentElement){
      element.parentElement.classList.remove('show');

      return true;
    }

    return false
  }
}
