import { Component, OnInit } from '@angular/core';
import { BalanceService } from './../balance.service';
import Swal from 'sweetalert2';

declare let $: any;
@Component({
    selector: 'app-fullbalance',
    templateUrl: './full-balances.component.html',
    styleUrls: ['./full-balances.component.css']
})
export class FullBalanceComponent implements OnInit {
    userId: any;
    fullBalanceData: any;
    loading = {};
    array=[];
    // throttle = 1000;
    // scrollDistance = 1;
    // scrollUpDistance = 2;
    balanceloader: boolean = false;
    private currentPage = 1;
    searchItem: any;
    hideZero: any;
    modaldata: any
    depositAmount: any;
    withdrawAmount: any;
    wallet_balance = {};
    click = {};
    reverseSort: boolean;
    orderByField: any;
    depositloader:boolean=false;
    withdrawloader:boolean=false;
    constructor(private balanceService: BalanceService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('DUserId');
        this.getFullBalance();
    }

    onScroll() {
        this.currentPage++;
        this.balanceloader = true;
        this.balanceService.getFullBalance(this.userId, this.currentPage)
            .subscribe(res => {
                const a = res.json();
                this.fullBalanceData = [...this.fullBalanceData, ...a.user_balance];
                this.balanceloader = false;
            }, err => {
                this.balanceloader = false;
            });
    }
    // onScrollUp() {
    // }
    getFullBalance() {
        this.balanceloader = true;
        this.balanceService.getFullBalance(this.userId, this.currentPage)
            .subscribe(res => {
                const a = res.json();
                this.fullBalanceData = a.user_balance;
                this.fullBalanceData = [...this.fullBalanceData , ...a.user_balance];
                this.balanceloader = false;
            }, err => {
                this.balanceloader = false;
                this.fullBalanceData = [];
            });
    }

    depositmodal(data) {
        $('#deposit').modal('show');
        this.modaldata = data;
    }

    withdrawmodal(data) {
        $('#withdraw').modal('show');
        this.modaldata = data;
    }

    deposit(data) {
        this.depositloader = true;
        const formData = new FormData();
        formData.append('user', this.userId);
        formData.append('coin', data);
        formData.append('balance', this.depositAmount);
        this.balanceService.depositAmount(formData)
            .subscribe((res: any) => {
                this.depositloader = false;
                const a = res.json();
                $('#deposit').modal('hide');
                Swal(
                    '', a.message,

                    'info'
                )
            }, err => {
                Swal("Something Went Wrong!!","Please Try Again","error");
                this.depositloader = false;
            });
    }

    withdraw(data) {
        this.withdrawloader = true;
        const formData = new FormData();
        formData.append('user', this.userId);
        formData.append('coin', data);
        formData.append('balance', this.withdrawAmount);
        this.balanceService.withdrawAmount(formData)
            .subscribe((res: any) => {
                this.withdrawloader = false;
                $('#deposit').modal('hide');
                const a = res.json();
                var link = 'http://ropsten.etherscan.io/tx/' + a.message.data.hash;
                var text = '<a target="_blank" href=' + link + '><h5> Here </h5></a>'
                Swal({
                    title: 'Withdrawl Successfull <br> Check Status ',
                    html: text,
                    type: 'info'
                })
            }, err => {
                $('#withdraw').modal('hide');
                Swal("Something Went Wrong!!","Please Try Again","error");
                this.withdrawloader = false;
            });
    }

    Query(data) {
        const formData = new FormData();
        formData.append('user', this.userId);
        formData.append('coin', data.coinId);
        // formData.append('coinshort', data.shortname);
        // formData.append('ok', 'ok');
        console.log('initial')
        this.click[data.coinId] = data.coinId;
        this.loading[data.coinId] = true;
        this.balanceService.query(formData)
            .subscribe((res:any) => {
                this.loading[data.coinId] = false;
                const a = res.json();
                // this.wallet_balance[data.coinId]=a.user_balance[1].walet_bal;
                this.array = a.user_balance;
                                for (const x of this.array) {
                                this.wallet_balance[data.coinId] = x.walet_bal;
                                }
        }, err => {
            this.loading[data.coinId] = false;
        });

    }
}