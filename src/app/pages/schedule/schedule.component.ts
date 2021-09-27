import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit,
} from '@angular/core';
import {
  startOfDay,
  isSameDay
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import {RefreshService} from '../../shared/services/refresh.service';
import {GoogleSignInService} from '../../shared/services/google-sign-in.service';
import {StorageService} from '../../shared/services/storage.service';
import {IEvent} from '../../shared/models/interfaces';

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) public modalContent!: TemplateRef<any>;
  @ViewChild('modalAddMeal', { static: true }) public modalAddMeal!: TemplateRef<any>;

  public view: CalendarView = CalendarView.Week;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public modalData!: {
    action: string;
    event: CalendarEvent;
  };
  public events: IEvent[] = [
    /*{
      start: startOfDay(new Date()),
      title: 'Chicken',
      kcal: 340,
      color: colors.blue,
      actions: this.actions}*/
      /*resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      kcal: 340,
      color: colors.blue,
      actions: this.actions,
    },
    {
      start: startOfDay(new Date()),
      title: 'A long event that spans 2 months',
      kcal: 340,
      color: colors.blue,
    }
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];
  public activeDayIsOpen: boolean = true;
  public numbers: Map<string, number> = new Map();
  public currentKcal: number = 0;
  public userID!: string;

  private newEvent!: { kcal: number; display: boolean; start: Date; title: string };

  constructor(
    private modal: NgbModal,
    public rs: RefreshService,
    private signInService: GoogleSignInService,
    public storage: StorageService
  ) {}

  public handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  public addEvent(): void {
    this.newEvent = {
      title: 'New meal',
      start: startOfDay(new Date()),
      kcal: 500,
      display: true
    };
    this.events = [
      ...this.events,
      this.newEvent,
    ];
  }

  public deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  public setView(view: CalendarView): void {
    this.view = view;
  }

  public closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  public addMeal(eventToAdd: any): void {
    this.addMealEvent('Add new meal', eventToAdd);
  }

  public calculatorKcal(): boolean {
    const arr: Date[] = [];
    this.events.forEach(el => {
      arr.push(el.start);
    });
    let fKcal: number = 0;
    let fKey: string = '';
    for ( const value in arr) {
      const findObj = { start: arr[value] };
      this.events.forEach( item => {
        if (isSameDay(findObj.start, item.start)) {
          fKcal += item.kcal;
          fKey = arr[value].toLocaleDateString();
        }
      });
    }
    this.numbers.set( fKey, fKcal );
    const currentDate = this.numbers.get(this.viewDate.toLocaleDateString());
    currentDate ? this.currentKcal = currentDate : this.currentKcal = 0;
    return !!currentDate;
  }

  public addMealInfo( eventToDisplay: IEvent): void {
    const previousEvents = this.events.filter( event => event !== eventToDisplay);
    this.newEvent.display = false;
    this.events = [...previousEvents, this.newEvent];
    this.handleEvent( 'Clicked', eventToDisplay);
    this.storage.set(this.userID, this.events);
  }

  public ngOnInit(): void {
    this.signInService.observable().subscribe(user => {
      this.userID = user.getId();
    });
    const data = this.storage.get(this.userID);
    for ( const i in data) {
      data[i].start = new Date(data[i].start);
      this.events = [
        ...this.events,
        data[i],
      ];
    }
  }

  private addMealEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalAddMeal, { size: 'lg'});
    this.addEvent();
  }
}
