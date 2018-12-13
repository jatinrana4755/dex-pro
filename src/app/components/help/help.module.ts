import { FooterComponent } from './../footer/footer.component';
import { NgModule } from '@angular/core';
import {GuidesComponent} from './guides/guides.component';
import { FaqComponent } from './faq/faq.component';
import { HelpComponent } from './help.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from './../footer/footer.module';
import { NavLoggedInModule } from './../nav-logged-in/nav-logged-in.module';
import {CommonModule} from '@angular/common';



@NgModule({
    imports: [
        NavLoggedInModule,
        FooterModule,
        CommonModule,
        RouterModule.forChild([
            { path: '', component: HelpComponent ,
                children: [
                    { path: 'guides', component: GuidesComponent, },
                    { path: 'faq', component: FaqComponent,}
                ]
            },
        ])
    ],
    exports: [],
    declarations: [
        GuidesComponent,
        FaqComponent,
        HelpComponent
    ]
})

export class HelpModule {}
