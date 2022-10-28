import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DailogService } from './dailog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DailogService', () => {
  let service: DailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(DailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});