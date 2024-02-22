import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyACarComponent } from './buy-a-car.component';

describe('BuyACarComponent', () => {
  let component: BuyACarComponent;
  let fixture: ComponentFixture<BuyACarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyACarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
