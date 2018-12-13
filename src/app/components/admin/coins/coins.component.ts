import { Component, OnInit } from '@angular/core';
import { AdminDataService } from './../../../providers/admin-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {
  coinName: any;
  coinShortName: any;
  coinContractadd: any;
  coinAbi: any;
  coinTm: Boolean = false;
  coinEth: Boolean = false;
  coinDeposite: Boolean = false;
  coinWithdrawl: Boolean = false;
  coinTransfer: Boolean = false;
  coinLoader: any;
  editLoader = {}
  allCoin: any;
  coinArray = [];
  id: any;
  coin: any;
  search: any;
  loader: boolean = false;
  p: any;
  currentCoin: any;
  deleteLoader = {};
  // addAbi: any;
  editAbi: any;
  // Array = [[{ value: '', key: 'name' }, { value: '', key: '' }]];
  // addarray = [{ value: '', key: 'name' }, { value: '', key: '' }];
  all: any;
  keys: any;
  detailLoader = {};
  addcoinloader: boolean = false;
  editcoinloader: boolean = false;
  abi: any;
  constructor(private ds: AdminDataService, private _route: ActivatedRoute, private router: Router, private form: NgForm) { }

  ngOnInit() {
    this.getCoins();
  }
  AddCoin(form: NgForm) {
    // const abi = JSON.stringify(this.Array);
    // this.Array.forEach(element => {
    //   let obj = {};
    //   // const obj = element["key"]
    //   element.forEach(e => {
    //     obj[e.key] = e.value;
    //   });
    //   this.abiArray.push(obj);
    // });
    const coinData = {
      name: this.coinName,
      shortname: this.coinShortName,
      contract_add: this.coinContractadd,
      Abi: this.abi,
      for_tm: this.coinTm,
      for_eth: this.coinEth,
      is_deposite: this.coinDeposite,
      is_withdrawl: this.coinWithdrawl,
      is_transfer: this.coinTransfer
    }
    this.addcoinloader = true;
    this.ds.AddCoin(coinData).subscribe(res => {
      this.allCoin = res;
      // this.Array = [[{ value: '', key: '' }, { value: '', key: '' }]];
      this.getCoins();
      $('#addModal').modal('hide');
      form.resetForm();
      this.addcoinloader = false;
      Swal(
        'Coin Added Successfully',
      );

    },
      error => {
        this.addcoinloader = false;
        Swal(
          'Error Occurred',
        );
      })
  }
  storeDetails = (coin) => {
    this.id = coin.id;
    this.coin = coin;


  }
  public getSingleCoinInformationedit(id) {
    this.editLoader[id] = true;
    this.ds.getSingleCoinInformation(id).subscribe(
      res => {

        this.editLoader[id] = false;
        this.currentCoin = res;
        $('#editModal').modal('show');
      },
      error => {
        this.editLoader[id] = false;
        Swal(
          'Error Occurred',
        );
      })
  }

  // addAb(w) {
  //   w.push({ value: '', key: '' });
  // }

  // addArr() {
  //   this.Array.push([{ value: '', key: '' }, { value: '', key: '' }]);
  // }

  // removeAb(In, i) {
  //   if (this.Array[In].length > 1) {
  //     // this.disableRemoveWu = false;
  //     this.Array[In].splice(i, 1);
  //   } else {
  //     Swal(
  //       'Array Index should Be Greater than 1',
  //     );
  //   }
  // }

  // removeArray(In) {
  //   if (this.Array.length > 1) {
  //     // this.disableRemoveWu = false;
  //     this.Array.splice(In, 1);
  //   } else {
  //     Swal(
  //       'Array Index should Be Greater than 1',
  //     );
  //   }
  // }

  public getSingleCoinInformation(id) {
    this.detailLoader[id] = true
    this.ds.getSingleCoinInformation(id).subscribe(

      res => {
        $('#detailModal').modal('show');
        this.detailLoader[id] = false;
        this.currentCoin = res;
        // this.editAbi=JSON.parse(res.Abi);
        // for(let x of this.editAbi){
        //  this.keys=Object.keys(x)
        //  this.keys.map(data => {
        //  })
        // }


      }, error => {
        this.detailLoader[id] = false;
        Swal(
          'Error Occurred',
        );
      })
  }

  public deleteCoin(id) {
  
    this.deleteLoader[id] = true;
    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((value)=>{
     console.log(value.value)

  
    if(value.value == true) { 

    this.ds.deleteCoin(id).subscribe(
      res => {
        this.deleteLoader[id] = false;
        console.log('deleted',res)
      

        Swal(
          'Deleted Successfully',

        );
        this.getCoins();

      })
      
      
    }
      
      },
      error => {

      }
    )

  }

  public editCoin(currentCoinId, currentCoin): any {
    this.editcoinloader = true
    this.ds.editCoin(currentCoinId, currentCoin).subscribe(res => {
      $('#editModal').modal('hide');
      this.editcoinloader = false;
      this.getCoins();
      Swal(
        'Coin edited Successfully',
      );
    }, error => {
      this.editcoinloader = false;
      Swal(
        'Error Occurred',
      );
    })
  }

  getCoins() {
    this.loader = true;
    this.ds.getCoins()
      .subscribe((res: any) => {

        this.coinArray = res;
        this.loader = false;

      }, error => {
        this.loader = false;
        Swal(
          'Error Occurred',
        );
      })
  }


}
