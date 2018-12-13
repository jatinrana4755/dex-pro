import { NgForm } from '@angular/forms';
import { AdminDataService } from './../../../providers/admin-data.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

declare let $: any;
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  loader:boolean =false;
 NoticeArray: any;
 charttype: any;
 message: any;
 addloader:boolean=false;
//  notice: any;
  constructor(private ds: AdminDataService) { }

  ngOnInit() {
    this.getNotice();
  }


   AddNotice(form: NgForm){
   this.addloader=true; 
   this.ds.addNotice(this.charttype , this.message).subscribe( 
     res=>{
     this.getNotice();
     form.resetForm(); 
     this.addloader = false;
     $('#addModal').modal('hide');
     Swal(
       'Notice Added Successfully',
     );
      },
     error=>{
      this.addloader = false;
      Swal(
        'Error Occurred', 
      );
     }


   );
 }

  getNotice() {
    this.loader= true;
    this.ds.getNotice()
        .subscribe((res: any) => {
            this.NoticeArray = res;
            console.log(res);
            this.message = this.NoticeArray.notice[0].message;
            this.charttype = this.NoticeArray.notice[0].charttype;
            this.loader = false;

            },
            (error: any) => {
              this.loader = false;
            });
        }
  }

