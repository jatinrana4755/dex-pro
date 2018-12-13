import { AdminDataService } from './../../../providers/admin-data.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})

export class FeesComponent implements OnInit {
  fee: any;
  loader = false;
  storedFee: any;
  allFee: any;
  postLoader = false;
  constructor(public ds: AdminDataService) { }

  ngOnInit() {
    this.getFee();
  }

  getFee() {
    this.loader = true;
    this.ds.getFee().subscribe((res: any) => {
      this.loader = false;
      this.allFee = res;
    },
    error=>{
     this.loader = false;
     Swal(
       'Error Occurred', 
     );
    }
  );
  }


  storeInfo(fee) {
    this.storedFee = fee;
  }

  postFee(type) {
    this.postLoader = true;
    const formData = new FormData();
    formData.append('fee', this.fee);
    this.ds.postFee(formData, type).subscribe((res: any) => {
      $('#FeeModal').modal('hide');
      this.postLoader = false;
      this.getFee();
      Swal(
        '',
        ` ${type} fee changed` ,
        'success');
    }, err => {
      this.postLoader = false;
      Swal(
        '',
        'error',
        'warning'
      );
    });
  }
}




