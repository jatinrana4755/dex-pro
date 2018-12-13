import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { AuthService } from './../../providers/auth.service';
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';

declare let $: any;
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    password: string;
    data: any;
    isLoggedIn: boolean;
    wait: boolean;
    constructor(private as: AppService, private auth: AuthService, private router: Router) {
        this.isLoggedIn = this.auth.isLoggedIn();

    }

    submit() {
        this.wait = true;
        if (this.password.length >= 8) {
            this.as.createWallet(this.password).subscribe((res: any) => {
                this.data = res;
                this.wait = false;
                $('#myModal').modal('show');
            });
        } else {
            this.wait = false;
            Swal(
                'Opps',
                'The length password should be atleast 8 ',
                'error'
              );
        }
    }

    downloadFile() {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data.filedata)));
        element.setAttribute('download', this.data.filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    copyPrivateKey() {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(document.getElementById('privatekey'));
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('Copy');
        document.getElementById('msg-copy').innerHTML = '<i class="fas fa-check-circle text-success"></i>&nbsp; Text Copied';
    }
    
}
