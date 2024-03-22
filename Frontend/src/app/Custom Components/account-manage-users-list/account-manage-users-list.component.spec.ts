import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManageUsersListComponent } from './account-manage-users-list.component';

describe('AccountManageUsersListComponent', () => {
  let component: AccountManageUsersListComponent;
  let fixture: ComponentFixture<AccountManageUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountManageUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountManageUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
