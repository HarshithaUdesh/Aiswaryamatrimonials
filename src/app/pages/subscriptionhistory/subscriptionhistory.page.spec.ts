import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionhistoryPage } from './subscriptionhistory.page';

describe('SubscriptionhistoryPage', () => {
  let component: SubscriptionhistoryPage;
  let fixture: ComponentFixture<SubscriptionhistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
