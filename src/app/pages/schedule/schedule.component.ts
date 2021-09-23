import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  isSameDay,
  isSameMonth
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#1e90ff',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


interface MyEvent extends CalendarEvent {
  display: boolean;
  kcal: number;
}

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  // @ts-ignore
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('modalAddMeal', { static: true }) modalAddMeal: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  // @ts-ignore
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent:any) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject<any> = new Subject();
  events: MyEvent[] = [
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

  activeDayIsOpen: boolean = true;
  numbers = new Map();
  currentKcal!: number;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addMealEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalAddMeal, { size: 'lg'});
    this.addEvent()

  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New meal',
        start: startOfDay(new Date()),
        kcal: 500,
        color: colors.blue,
        display: true
      },
    ];
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addMeal(eventToAdd:any) {
    this.addMealEvent('Add new meal', eventToAdd)
  }

  calculatorKcal(): boolean{
    let arr: Date[] = []
    this.events.forEach((evnt)=> {
      arr.push(evnt.start)
    })
    let fKcal = 0
    let fKey: any
    for ( let value in arr){
      let findObj = { start: arr[value] };
      this.events.forEach(function(item) {
        if (findObj.start == item.start ){
          fKcal = item.kcal + fKcal
          fKey = arr[value].toLocaleDateString()
        }
      });
    }
    this.numbers.set(fKey,fKcal);
    let current_date = this.numbers.get(this.viewDate.toLocaleDateString())
    if(current_date){
      this.currentKcal = current_date
      return true
    } else {
      this.currentKcal = 0
      return false
    }
  }

  openDayInfo(eventToDisplay: MyEvent) {
    let arr = this.events.filter((event) => event !== eventToDisplay)
    let ev = this.events.filter((event) => event === eventToDisplay)[0]
    // @ts-ignore
    this.events = [...arr,ev]
    this.handleEvent('Added meal', eventToDisplay)
  }
}
