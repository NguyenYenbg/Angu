import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms'
import { ApiService } from '../share/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() companyEdit:any;
  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public api: ApiService) {}

  

  companyForm=this.fb.group({
    id: this.fb.control({value:'', disabled:true}),
    name:this.fb.control('', Validators.required),
    empcount:this.fb.control('', Validators.required),
    revenue:this.fb.control('', Validators.required),
    address:this.fb.control('', Validators.required),
    isActive:this.fb.control(true),
  })

  ngOnInit(){
    console.log(this.companyEdit);
    if(this.companyEdit){
      this.companyForm.setValue({
        "id": this.companyEdit.id,
        "name": this.companyEdit.name,
        "empcount": this.companyEdit.empcount,
        "revenue": this.companyEdit.revenue,
        "address":this.companyEdit.revenue,
        "isActive": this.companyEdit.isActive,
      })
    }
  }


  closePopup(){
    this.activeModal.close('Close click');
  }
  loadPage(){
    this.api.Getallcompany().subscribe(res=>{
      console.log(res);
    })
  }

  SaveCompany(){
    if(this.companyForm.valid){
      const idEdit=this.companyForm.getRawValue().id;
      if(idEdit){
        this.api.Updatecompany(idEdit, this.companyForm.getRawValue()).subscribe(res=>{
          console.log(res);
          this.closePopup();
          alert("Update succefully!");
        })
      }else{
        this.api.Createcompany(this.companyForm.value).subscribe(res=>{
          console.log(res);
          this.closePopup();
          setTimeout(()=>{
            alert("Add succefully!");
          }, 1000)
        })
      }
    }
  }
}
