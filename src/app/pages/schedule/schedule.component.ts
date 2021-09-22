
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
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
    {
      start: startOfDay(new Date()),
      title: 'Chicken',
      kcal: 340,
      color: colors.blue,
      actions: this.actions}
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

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent:any) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addMealEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
/*    if(document.body.style.overflow != 'hidden'){
      document.body.style.overflow = hidden
    }*/
    this.modal.open(this.modalAddMeal, { size: 'lg'});
  }

  addEvent(element:any): void {
    element.style.display = 'table'
    element.childNodes.forEach((el:any)=>{
      if(el.tagName=="TBODY"){
        el.style.display="none"
      }
    })
    if(element.lastChild.previousSibling.tagName!="THEAD"){
      element.lastChild.previousSibling.style.display ="none"
    }
    let date = new Date();
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        /*end: endOfDay(new Date()),*/
        /*date.setTime(date.getTime() + 60 * 60 * 1000)*/
        kcal: 1230,
        color: colors.blue,
/*        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },*/
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
    console.log(this.numbers)
    console.log(current_date)
    if(current_date){
      this.currentKcal = current_date
      return true
    } else {
      this.currentKcal = 0
      return false
    }
  }
}
