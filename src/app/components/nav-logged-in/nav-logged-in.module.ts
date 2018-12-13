import { NavLoggedInComponent } from './nav-logged-in.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        NavLoggedInComponent
    ],
    exports: [
        NavLoggedInComponent
    ]
})

export class NavLoggedInModule { }
