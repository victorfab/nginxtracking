import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTrackingComponent } from './error-tracking.component';

describe('ErrorTrackingComponent', () => {
  let component: ErrorTrackingComponent;
  let fixture: ComponentFixture<ErrorTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorTrackingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
