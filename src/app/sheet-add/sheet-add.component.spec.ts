import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetAddComponent } from './sheet-add.component';

describe('SheetAddComponent', () => {
  let component: SheetAddComponent;
  let fixture: ComponentFixture<SheetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
