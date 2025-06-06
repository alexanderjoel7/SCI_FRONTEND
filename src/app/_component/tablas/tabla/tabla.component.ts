import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule  } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [TableModule,CommonModule,InputTextModule,IconField,InputIcon],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})

export class TablaComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() rows: number = 5;
  @Output() editarRow = new EventEmitter<any>(); 
  @Output() eliminarRow = new EventEmitter<any>(); 
  @ViewChild('dt') dt: Table;
  filtrarGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }  
  editar(row: any) {
    this.editarRow.emit(row);
  }
  ver(row: any) {
    console.log('Ver:', row);
  }
  eliminar(row: any) {
    this.eliminarRow.emit(row);
  }  
}
