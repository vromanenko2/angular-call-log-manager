import { Injectable, EventEmitter, Output } from '@angular/core';
import { CallLog } from './../models/calllog.type';
import { Status } from './../models/status.type';
import { StatusId } from './../models/status-id.enum';
import { SearchResult } from './../models/search-result.type';

@Injectable()
export class CallLogService {
  private readonly localStorageName: string = 'call-log-manager-storage';
  private nextId: number = 1;
  private storage: CallLog[];
  private readonly statuses: Status[];

  constructor() {
    this.storage = [];

    this.statuses = [
      { id: StatusId.Open, name: 'Open' },
      { id: StatusId.Resolved, name: 'Resolved' },
      { id: StatusId.Closed, name: 'Closed' }
    ];

    this.populateStorage();
  }

  getStatuses(): Status[] {
    return this.statuses;
  }

  getStatus(statusId: StatusId): Status {
    return this.statuses.find(i => {
      return i.id == statusId;
    });
  }

  getById(id: number): CallLog {
    let result: CallLog = this.createObject();
    if (id > 0) {
      const storageItem: CallLog = this.storage.find(i => {
        return i.id === id;
      });

      if (storageItem) {
        return Object.assign(result, storageItem);
      }
    }

    return result;
  }

  getItems(
    pageSize: number,
    pageNumber: number,
    onlyOpen: boolean,
    search: string
  ): SearchResult<CallLog> {
    const maxIndex: number = pageSize * pageNumber;
    const minIndex: number = maxIndex - pageSize;
    let searchResult: CallLog[];
    let result: SearchResult<CallLog> = {
      data: [],
      count: 0
    };
    if (search && search.trim().length > 0) {
      search = search.trim().toUpperCase();
      searchResult = this.storage.filter(
        (i: CallLog): boolean => {
          if (onlyOpen && i.status.id !== StatusId.Open) {
            return false;
          }

          if (i.user && i.user.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          if (i.email && i.email.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          if (i.phone && i.phone.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          if (i.title && i.title.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          if (i.problem && i.problem.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          if (i.solution && i.solution.toUpperCase().indexOf(search) >= 0) {
            return true;
          }

          return false;
        }
      );
    } else if (onlyOpen === true) {
      searchResult = this.storage.filter(
        (i: CallLog): boolean => {
          return i.status.id === StatusId.Open;
        }
      );
    } else {
      searchResult = this.storage;
    }

    result.data = searchResult.filter(
      (i: CallLog, index: number): boolean => {
        return index < maxIndex && index >= minIndex;
      }
    );
    result.count = searchResult.length;

    return result;
  }

  createObject(): CallLog {
    const result: CallLog = {
      id: 0,
      user: '',
      created: new Date(),
      title: '',
      problem: '',
      solution: '',
      status: this.getStatus(StatusId.Open)
    };

    return result;
  }

  save(callLog: CallLog): boolean {
    let result: boolean = false;
    if (!callLog.id) {
      callLog.id = this.nextId;
      callLog.created = new Date();
      this.storage.push(callLog);
      this.nextId++;

      result = true;
    } else {
      this.setStatusDate(callLog);
      for (let counter = 0; counter < this.storage.length; counter++) {
        if (this.storage[counter].id === callLog.id) {
          this.storage[counter] = callLog;
          result = true;
          break;
        }
      }
    }

    this.saveLocalStorageData();

    return result;
  }

  private setStatusDate(callLog: CallLog): void {
    if (callLog.status.id === StatusId.Resolved && !callLog.resolved) {
      callLog.resolved = new Date();
    }
    if (callLog.status.id === StatusId.Closed && !callLog.closed) {
      callLog.closed = new Date();
    }
  }

  populateStorage(): void {
    //const items: CallLog[] = this.fakeItems();
    const items: CallLog[] = this.getLocalStorageData();
    for (let callLog of items) {
      if (callLog.id + 1 > this.nextId) {
        this.nextId = callLog.id + 1;
      }
      this.storage.push(callLog);
    }
  }

  getLocalStorageData(): CallLog[] {
    let result: CallLog[] = [];
    const localStorageData: string = localStorage.getItem(
      this.localStorageName
    );

    if (localStorageData && localStorageData.length > 0) {
      result = JSON.parse(localStorageData);
      result.map(i => {
        i.created = new Date(i.created);
        if(i.resolved){
          i.resolved = new Date(i.resolved);
        }
        if(i.closed){
          i.closed = new Date(i.closed);
        }
      });
    }

    return result;
  }

  saveLocalStorageData(): void {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.storage));
  }

  fakeItems(): CallLog[] {
    const result: CallLog[] = [
      {
        id: 1,
        user: 'User 1',
        title: 'title 1',
        created: new Date(),
        problem: 'problem 1',
        status: this.statuses[0]
      },
      {
        id: 2,
        user: 'User 2',
        title: 'title 2',
        created: new Date(),
        problem: 'problem 2',
        status: this.statuses[0]
      },
      {
        id: 3,
        user: 'User 3',
        title: 'title 3',
        created: new Date(),
        problem: 'problem 3',
        status: this.statuses[0]
      },
      {
        id: 4,
        user: 'User 4',
        title: 'title 4',
        created: new Date(),
        problem: 'problem 4',
        status: this.statuses[0]
      },
      {
        id: 5,
        user: 'User 5',
        title: 'title 5',
        created: new Date(),
        problem: 'problem 5',
        status: this.statuses[0]
      },
      {
        id: 6,
        user: 'User 6',
        title: 'title 6',
        created: new Date(),
        problem: 'problem 6',
        status: this.statuses[0]
      },
      {
        id: 7,
        user: 'User 7',
        title: 'title 7',
        created: new Date(),
        problem: 'problem 7',
        status: this.statuses[0]
      },
      {
        id: 8,
        user: 'User 8',
        title: 'title 8',
        created: new Date(),
        problem: 'problem 8',
        status: this.statuses[0]
      },
      {
        id: 9,
        user: 'User 9',
        title: 'title 9',
        created: new Date(),
        problem: 'problem 9',
        status: this.statuses[1]
      },
      {
        id: 10,
        user: 'User 10',
        title: 'title 10',
        created: new Date(),
        problem: 'problem 10',
        status: this.statuses[2]
      }
    ];
    return result;
  }
}
