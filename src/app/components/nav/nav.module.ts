import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        NavComponent
    ],
    exports: [
        NavComponent
    ]
})

export class NavModule { }
