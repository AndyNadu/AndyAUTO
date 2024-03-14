import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFavouriteCarsComponent } from './account-favourite-cars.component';

describe('AccountFavouriteCarsComponent', () => {
  let component: AccountFavouriteCarsComponent;
  let fixture: ComponentFixture<AccountFavouriteCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFavouriteCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountFavouriteCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
