import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../share/api.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  page=1;
  sizeCompany:any;
  constructor(private modalService: NgbModal, private api: ApiService) {}
  companydata!: any[];

  ngOnInit():void{
    this.loadCompany();
  }

  
  createCompany(){
    const modalRef = this.modalService.open(PopupComponent);
  }

  loadCompany(){
    this.api.Getallcompany().subscribe(res=>{
      console.log(res);
      this.companydata=res;
      this.sizeCompany=this.companydata.length;
      // this.page=Math.floor(this.sizeCompany/3);
    })
  }
  
  editCompany(company: any){
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.companyEdit=company;
  }


  deleteCompany(id:any){
    this.api.DeletecompanybyId(id).subscribe(res=>{
      console.log(res);
      this.loadCompany();
    })
  }
}
