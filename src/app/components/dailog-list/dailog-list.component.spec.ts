import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogListComponent } from './dailog-list.component';

describe('DailogListComponent', () => {
  let component: DailogListComponent;
  let fixture: ComponentFixture<DailogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
