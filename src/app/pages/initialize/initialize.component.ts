import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CalendarEvent} from "angular-calendar";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent {
  // @ts-ignore
  @ViewChild('modalLogIn', { static: true }) modalLogIn: TemplateRef<any>;

  name = new FormControl('');

  modalData: any

  constructor(private modal: NgbModal) {}

  addMealEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalLogIn, { size: 'lg' });
  }

  openModalLogIn(eventToAdd:any) {
    this.addMealEvent('Add new meal', eventToAdd)
  }

}
