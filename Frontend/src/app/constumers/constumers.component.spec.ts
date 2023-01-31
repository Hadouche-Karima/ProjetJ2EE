import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstumersComponent } from './constumers.component';

describe('ConstumersComponent', () => {
  let component: ConstumersComponent;
  let fixture: ComponentFixture<ConstumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstumersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
