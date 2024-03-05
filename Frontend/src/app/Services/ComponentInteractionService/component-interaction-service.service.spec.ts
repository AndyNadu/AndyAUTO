import { TestBed } from '@angular/core/testing';

import { ComponentInteractionServiceService } from './component-interaction-service.service';

describe('ComponentInteractionServiceService', () => {
  let service: ComponentInteractionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentInteractionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
