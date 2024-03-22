import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManageUnverifiedCarsListComponent } from './account-manage-unverified-cars-list.component';

describe('AccountManageUnverifiedCarsListComponent', () => {
  let component: AccountManageUnverifiedCarsListComponent;
  let fixture: ComponentFixture<AccountManageUnverifiedCarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountManageUnverifiedCarsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountManageUnverifiedCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
