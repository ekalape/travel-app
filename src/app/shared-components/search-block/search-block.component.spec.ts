import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBlockComponent } from './search-block.component';

describe('SearchBlockComponent', () => {
  let component: SearchBlockComponent;
  let fixture: ComponentFixture<SearchBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
