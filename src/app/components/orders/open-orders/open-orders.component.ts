import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../orders.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent implements OnInit {
  orders: any;
  user: any;
  coin: any;
  dashboard: boolean = true;
  sale: any;
  buy: any;
  allData = [];
  allDataList: any;
  myOpenOrderdelete;
  loadercoin: any;
  date1: any;
  date2: any;
   param1:any;
   param2:any;
  reverseSort: boolean;
  orderByField: any;
  constructor(private order: OrdersService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.param1 = this.activatedRoute.snapshot.paramMap.get('coin');
    this.param2= this.activatedRoute.snapshot.paramMap.get('type');
   }

  ngOnInit() {
    this.user = localStorage.getItem('DUserId');
    this.coin = localStorage.getItem('coinId');
    this.getOpenOrders();

    this.checkroutes();
  }

  getOpenOrders() {
    if (localStorage.getItem('DUserId')) {
      this.loadercoin = true;
      this.order.getOpenOrders(this.coin, this.user).subscribe(res => {
        this.orders = res;
        this.loadercoin = false;
        this.sale = res['sale'];
        this.buy = res.buy;
        this.buy.forEach(element => {
          element.type = 'buy';
          this.allData.push(element);
        });
         this.sale.forEach(element => {
          element.type = 'sale';
          this.allData.push(element);
        });
        this.allDataList = this.allData;
      }, (error: any) => {
        this.loadercoin = false;
        this.allDataList = [];
      });
    } else {
      this.allDataList = [];
    }

  }

  checkroutes() {
    if (this.router.url == ('/dashboard/'+this.param1+"/"+this.param2)) {
      this.dashboard = false;
    } else {
      this.dashboard = true;
    }
  }
  deleteOrder = (id, type) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('order', type);
    Swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((value)=>{
     console.log(value.value)
     if(value.value == true) { 

    this.order.deleteOrder(formData).subscribe(
      data => {
        for (let i = 0; i < this.allDataList.length; i++) {
          if (this.allDataList[i].id === id) {

            this.allDataList.splice(i, 1);

            Swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

         
        }
      

      }
    })
  }
})
  }
  }
