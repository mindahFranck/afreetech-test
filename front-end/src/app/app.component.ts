import { Component } from '@angular/core';
import { OutputService } from './service/outPutData.service';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarVisible = true;

  constructor(private sidebarService: SidebarService,private outputService: OutputService) {}
  ngOnInit() {
    this.sidebarService.getSidebarStatus().subscribe(status => {
      this.sidebarVisible = status;
    });
  }


  dataTransfert(data:any){
    this.outputService.sendOutputData(data);

  }
  change(){
    this.outputService.change("ok")
  }
}
