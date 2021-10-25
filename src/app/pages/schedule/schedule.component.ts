import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {startOfDay} from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {RefreshService} from '../../shared/services/refresh.service';
import {StorageService} from '../../shared/services/storage.service';
import {IEvent, ImageSnippet, IUser} from '../../shared/models/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JsonService} from '../../shared/services/json.service';


@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContent', { static: true }) public modalContent!: TemplateRef<any>;
  @ViewChild('modalAddMeal', { static: true }) public modalAddMeal!: TemplateRef<any>;
  public view: CalendarView = CalendarView.Week;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public modalData!: {
    action: string;
    event: IEvent;
  };
  public userID: string = this.storage.get('ID');
  public events: IEvent[] = [];
  public activeDayIsOpen: boolean = true;
  public form!: FormGroup;
  private newEvent!: IEvent;

  constructor(
    private modal: NgbModal,
    public rs: RefreshService,
    public storage: StorageService,
    public db: JsonService,
  ) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [ Validators.required , Validators.minLength(3)]),
      start: new FormControl(startOfDay(new Date())),
      kcal: new FormControl(500, Validators.required),
      fats: new FormControl(30),
      proteins: new FormControl(30),
      carbohydrates: new FormControl(30),
    });
    this.getEvents(this.userID);
  }

  public ngAfterViewInit(): void {
    this.fetchEvents();
  }

  public handleEvent(action: string, event: CalendarEvent): void {
    // @ts-ignore
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  public addEvent(): void {
    this.newEvent = {
      title: 'New meal',
      start: startOfDay(new Date()),
      kcal: 500,
      fats: 30,
      proteins: 30,
      carbohydrates: 30,
      image: {
        src: '',
      },
      display: true
    };

    this.events = [
      ...this.events,
      this.newEvent,
    ];
  }

  public deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.storage.set(this.userID, this.events);
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

  public addMealInfo( eventToDisplay: IEvent): void {
    if (this.form.valid) {
      const img = this.newEvent.image;
      const previousEvents = this.events.filter( event => event !== eventToDisplay);
      this.newEvent = {...this.form.value};
      this.newEvent.display = false;
      this.newEvent.image = img;
      this.events = [...previousEvents, this.newEvent];
      this.db.updateUserEvents(this.userID, this.events).subscribe();
    }
  }

  public fetchEvents(events?: IEvent[]): IEvent[] {
    return this.events;
  }

  public getEvents(user: string): void {
    this.db.getEvents(user).subscribe(
      (response: IUser) => {
        let events: any[] = [];
        const data = response.data;
        data.forEach(item => {
          item.start = new Date(item.start);
          events = [...events, item];
        });
        this.events = events;
        setTimeout(() => {
          this.fetchEvents(events);
        }, 1000);
        /*console.log(this.events);*/
      }
    );
  }

  public cancelEvent(): void {
    this.events.pop();
  }

  public updateImage(image: ImageSnippet): any {
    return this.newEvent.image = image;
  }

  private addMealEvent(action: string, event: IEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalAddMeal, { size: 'lg'});
    this.addEvent();
  }
}
