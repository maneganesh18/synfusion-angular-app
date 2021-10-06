import { Component, Inject, ElementRef, OnInit,ViewChild } from '@angular/core';
import { sampleData } from '../jsontreegriddata';
import { TreeGridComponent,SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService,ColumnChooserService,ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService,ColumnChooserService,ToolbarService]
})
export class AppComponent {
  public data: Object[] = [];
  public pageSettings: any;
  public contextMenuItems: any;
  editing: EditSettingsModel | undefined;
  public toolbar: any;
  public editparams: any;
  public sortSettings: any;
  public selectionSettings: any;
  public d1data: any;
  public fields1: any;
  public d2data: any;
  public fields2: any;
  public d3data: any;
  public fields3: any;
  public multiselectkey: any;
  public sortenablekey : any

  @ViewChild('treegrid')
  public treegrid : any ;
  @ViewChild('taskName')
  public taskName: any;
  @ViewChild('priority')
  public priority: any;
  @ViewChild('startDate')
  public startDate: any;
  @ViewChild('progress')
  public progress: any;
  @ViewChild('price')
  public price: any;

  @ViewChild('dropdown1')
  public dropdown1: any;

  @ViewChild('dropdown2')
  public dropdown2: any;

  @ViewChild('dropdown3')
  public dropdown3: any;
  @ViewChild('cellselection')
  public cellselection : any

  // @ViewChild('cellselection') myDiv: ElementRef;
  // @ViewChild('cellselection', { static: false }) public mydiv: ElementRef;

  ngOnInit(): void {
    this.data = sampleData;
    this.multiselectkey= false;
    this.sortenablekey = false;
    this.toolbar = ['ColumnChooser'];
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
     'Edit', 'Delete', 'Save', 'Cancel',
    'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
    'LastPage', 'NextPage'];
    this.sortSettings =  { columns: [{ field: 'priority', direction: 'Ascending'  }, 
                                         { field: 'taskName', direction: 'Ascending' }]
                             }
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.pageSettings= { pageSize: 10 };
    this.editparams = {params: { format: 'n' }};

    this.selectionSettings = { type: 'Multiple' };
    this.fields1 = { text: 'type' , value: 'id'};
    this.d1data= [{ id: 'Single', type: 'Single' },
                  { id: 'Multiple', type: 'Multiple' }],
    this.fields2 = { text: 'mode' , value: 'id'};
    this.d2data= [{ id: 'Row', mode: 'Row' },
                  { id: 'Cell', mode: 'Cell' },],
    this.fields3 = { text: 'mode' , value: 'id'};
    this.d3data= [{ id: 'Flow', mode: 'Flow' },
                  { id: 'Box', mode: 'Box' }]

}

public enablesort(e: ChangeEventArgs) : void{
  if(this.sortenablekey){
    this.sortenablekey=false
  }else{
    this.sortenablekey=true
  }
}


public onClick1(e: MouseEvent): void {
  if (this.taskName.checked) {
      this.treegrid.sortByColumn('taskName', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('taskName');
  }

}
public onClick2(e: MouseEvent): void {
  if (this.priority.checked) {
      this.treegrid.sortByColumn('priority', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('priority');
  }

}
public onClick3(e: MouseEvent): void {
  if (this.startDate.checked) {
      this.treegrid.sortByColumn('startDate', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('startDate');
  }

}
public onClick4(e: MouseEvent): void {
  if (this.progress.checked) {
      this.treegrid.sortByColumn('progress', 'Ascending', true);
  } else {
      this.treegrid.grid.removeSortColumn('progress');
  }

}

public sort (args: SortEventArgs ): void {
  if (args.requestType === 'sorting') {
      for (let columns of this.treegrid.getColumns()) {
          for (let sortcolumns of this.treegrid.sortSettings.columns) {
              if (sortcolumns.field === columns.field) {
                  this.check(sortcolumns.field, true); break;
              } else {
                  this.check(columns.field, false);
              }
          }
      }
  }

}
public check(field: string, state: boolean): void {
  switch (field) {
      case 'orderName':
          this.taskName.checked = state; break;
      case 'priority':
          this.priority.checked = state; break;
      case 'startDate':
          this.startDate.checked = state; break;  
      case 'progress':
          this.progress.checked = state; break;
      case 'price':
          this.price.checked = state; break;
  }
}

 public enablemultiselect(e: ChangeEventArgs) : void{
  if(this.multiselectkey){
    this.multiselectkey=false
  }else{
    this.multiselectkey=true
  }
}

change1(e: ChangeEventArgs) : void {
  let type: any = <string>e.value;
  let mode: any = <string>this.dropdown2.value;
  this.treegrid.selectionSettings.type = type;
  if ( type === 'Multiple' && mode === 'Cell' ) {
      // this.myDiv.style.display = 'table-row';
      (<HTMLInputElement>document.getElementById("cellselection")).style.display = 'table-row';

  } else {
      // document.getElementById('cellselection').style.display = 'none';
      (<HTMLInputElement>document.getElementById("cellselection")).style.display = 'none';

  }
}
change2 (e: ChangeEventArgs) : void {
    let mode: any = e.value;
        let type: any = <string>this.dropdown1.value;
        this.treegrid.selectionSettings.mode = mode;
        if ( type === 'Multiple' && mode === 'Cell' ) {
            // document.getElementById('cellselection').style.display = 'table-row';
            (<HTMLInputElement>document.getElementById("cellselection")).style.display = 'table-row';

        } else {
            // document.getElementById('cellselection').style.display = 'none';
            (<HTMLInputElement>document.getElementById("cellselection")).style.display = 'none';

        }
}
change3 (e: ChangeEventArgs) : void {
    let cellmode: any = <string>e.value;
    this.treegrid.selectionSettings.cellSelectionMode = cellmode;
}
}