import { Component, OnInit } from '@angular/core';
import { BalanceService } from './../balance.service';

@Component({
    selector: 'app-balancehistory',
    templateUrl: './balance-history.component.html',
    styleUrls: ['./balance-history.component.css']
})
export class BalanceHistoryComponent implements OnInit {
    userId: any;
    withdrawArr = [];
    depositArr = [];
    data = {
        'user': ''
    };
    balance = [];
    searchItem: any;
depositArray = [];
withdrawArray = [];
orderByField: any;
reverseSort: boolean;
loadBalance: boolean;
    constructor(private balanceService: BalanceService) { }

    ngOnInit() {
        this.userId = localStorage.getItem('DUserId');
        this.getWithdrawHistory();
        this.getDepositHistory();
    }
    getWithdrawHistory() {
        this.loadBalance = true;
        this.balanceService.getWithdrawalHistory(this.userId)
            .subscribe((res: any) => {
                this.loadBalance = false;
                this.withdrawArr = res.user_balance;
                this.withdrawArr.forEach(element => {
                    element['type'] = 'Withdraw';
                    this.withdrawArray.push(element);
                });
                this.concatArr();
            }, err => {
                this.loadBalance = false;
                this.withdrawArr=[];
            });
    }
    getDepositHistory() {
        this.loadBalance = true;
        this.balanceService.getDepositHistory(this.userId)
            .subscribe((res: any) => {
                this.loadBalance = false;
                this.depositArr = res.user_balance;
                 this.depositArr.forEach(element => {
                    element['type'] = 'Deposit';
                    this.depositArray.push(element);
                });
                this.concatArr();
            }, err => {
                this.loadBalance = false;
                this.depositArr =[];
            });
    }

    concatArr() {
        if (this.withdrawArray.length > 0 && this.depositArray.length > 0) {
            this.balance = this.withdrawArray.concat(this.depositArray);
        } else {
        if (this.withdrawArray.length > 0) {
            this.balance = this.withdrawArray;
        }
        if (this.depositArray.length > 0) {
            this.balance = this.depositArray;
        }
        }
    }
}
