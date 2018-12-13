
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/auth.service'
import { AppService } from './../../providers/app.service'
import Swal from 'sweetalert2';
import { switchAll } from '../../../../node_modules/rxjs/operators';

import { RouterModule, Router } from '@angular/router';
import * as web3 from 'web3';


@Component({
    selector: 'app-change',
    templateUrl: './changewallet.component.html',
    styleUrls: ['./changewallet.component.scss']
})
export class ChangeWalletComponent implements OnInit {
    privateKey: string;
    optionVal: number;
    password: any;
    filename: any;
    fileData: any;
    isLoggedIn: any;
    address: any;
    loadingP = false;
    loadingF = false;
    loadingM = false;
    disableButton = true;
    web3js: any;
    constructor(private auth: AuthService, private app: AppService, private router: Router) { }

    ngOnInit() {
        this.isLoggedIn = this.auth.isLoggedIn();
        this.web3js = new web3(new web3.providers.HttpProvider('http://104.237.156.106:8545'));
        // console.log(web3js)
    }
    checkValide() {
        if (this.password) {
            this.disableButton = false;
        } else {
            this.disableButton = true;
        }
    }

    submitP() {
        this.loadingP = true;
        this.auth.login(this.privateKey).subscribe(res => {
            this.loadingP = false;
            localStorage.setItem('DUserId', res.detail.user_id);
            localStorage.setItem('address', res.detail.address);
            this.setAdmin();
            this.router.navigate(['/dashboard']);

        });
        // this.router.navigate(['/dashboard']);
        // Swal(
        //     'Success',
        //     'Submitted successfully!',
        //     'success'
        // );

    }

    submitF() {
        if (!this.filename) {
            this.loadingF = false;
            Swal(
                'Error',
                'Select a file',
                'error'
              );
        } else {
            this.loadingF = true;
        }
        const formData = new FormData();
        formData.append('file_data', this.fileData);
        formData.append('file_name', this.filename);
        formData.append('password', this.password);
        this.app.changeWallet(formData).subscribe(res => {
            this.privateKey = res['privatekey'];
            this.auth.login(this.privateKey).subscribe(response => {
                this.loadingF = false;
                localStorage.setItem('DUserId', response.detail.user_id);
                localStorage.setItem('address', response.detail.address);
                this.setAdmin();
                this.router.navigate(['/dashboard']);
            });
        }, err => {
            const error = JSON.parse(err._body).error;
            Swal(
                'Error',
                error,
                'error'
              );
            this.loadingF = false;
        });
    }

    submitM() {
        this.loadingM = true;
        const formData = new FormData();
        formData.append('address', this.address);
        this.app.UnlockMask(formData).subscribe((res: any) => {
            this.loadingM = false;
            localStorage.setItem('DUserId', res.user_id);
            localStorage.setItem('address', res.address);
            this.setAdmin();
            this.router.navigate(['/dashboard']);
        });
        // this.router.navigate(['/dashboard']);
        // Swal(
        //     'Success',
        //     'Submitted successfully!',
        //     'success'
        //   );
        // window.location.href = '/dashboard';
    }
    openFile(event) {
        const input = event.target.files[0];
        // console.log('evetnt',event.target.value);
        document.getElementById('selectedFile').innerHTML = event.target.value;
        // let  file[] = input.File(); 
        this.filename = input.name;
        const reader: FileReader = new FileReader();
        reader.readAsText(input);
        let col;
        const that = this;
        reader.onloadend = function (e) {
            col = reader.result;
            that.fileData = col;
            return col;
        };
    }

    setAdmin() {
        localStorage.setItem('admin', 'true');
    }

    // metamasktransaction
    unlockWalletViaMetamask = () => {
                this.loadingM = true;
        window.localStorage.removeItem('metamask')
        localStorage.setItem('metamask', 'true');
        console.log(web3, this.web3js);
        if ( this.web3js.eth == 'undefined' || this.web3js.eth.accounts[0] == undefined) {
            console.log('no meta mask ')
            Swal('Add Metamask',
                ' ',
                'info');
            this.web3js = new web3(new web3.providers.HttpProvider('http://104.237.156.106:8545'));
        } else {
            this.web3js = new web3(web3.currentProvider);
            console.log(this.web3js);
            const dataToSend = ({ address: web3.eth.accounts[0] });
            this.app.UnlockMask(dataToSend).subscribe(res => {
                this.loadingM = false;
            localStorage.setItem('DUserId', res.user_id);
            localStorage.setItem('address', res.address);
            this.setAdmin();
            this.router.navigate(['/dashboard']);
                Swal('Successfully Login!',
                    ' ',
                    'success');
            });
            // 			unlockwithmeta.unlock_meta(dataToSend).then(
            // 				function (data) {

            // 					window.localStorage.setItem('LoginDetails', JSON.stringify(data.data));
            // 					swal('Successfully Login!',
            // 						' ',
            // 						'success');
            // 					$state.go('dashboard');
            // 				},
            // 				function (error) {
            // 					console.log('Error: Something went wrong');
            // 				}
            // );
        }

    }
}
