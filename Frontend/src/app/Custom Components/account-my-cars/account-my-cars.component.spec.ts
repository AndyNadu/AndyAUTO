import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMyCarsComponent } from './account-my-cars.component';

describe('AccountMyCarsComponent', () => {
  let component: AccountMyCarsComponent;
  let fixture: ComponentFixture<AccountMyCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMyCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountMyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
