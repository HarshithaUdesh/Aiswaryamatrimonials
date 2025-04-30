import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MydashboardPage } from './mydashboard.page';

describe('MydashboardPage', () => {
  let component: MydashboardPage;
  let fixture: ComponentFixture<MydashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MydashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
