import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManageLocationsComponent } from './account-manage-locations.component';

describe('AccountManageLocationsComponent', () => {
  let component: AccountManageLocationsComponent;
  let fixture: ComponentFixture<AccountManageLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountManageLocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountManageLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
