import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellACarFormComponent } from './sell-a-car-form.component';

describe('SellACarFormComponent', () => {
  let component: SellACarFormComponent;
  let fixture: ComponentFixture<SellACarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellACarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellACarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
