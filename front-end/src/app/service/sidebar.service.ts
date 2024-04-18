// sidebar.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarStatus = new BehaviorSubject<boolean>(false);

  getSidebarStatus() {
    return this.sidebarStatus.asObservable();
  }

  toggleSidebar() {
    this.sidebarStatus.next(!this.sidebarStatus.value);
  }
}
