import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { TreeGridAllModule,FilterService } from '@syncfusion/ej2-angular-treegrid';
import { ButtonAllModule , CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridAllModule,
    CheckBoxAllModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    ButtonAllModule
    
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
