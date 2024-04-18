// output.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OutputService {
  private outputDataSubject: Subject<any> = new Subject<any[]>();
  outputData$ = this.outputDataSubject.asObservable();
  private outputChange: Subject<any> = new Subject<any[]>();
  outputState$ = this.outputChange.asObservable();

  sendOutputData(data: string): void {
    this.outputDataSubject.next(data);
  }
  change(data:any):void {
    this.outputChange.next(data);
  }

}
