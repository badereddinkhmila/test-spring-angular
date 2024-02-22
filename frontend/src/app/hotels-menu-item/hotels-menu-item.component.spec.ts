import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsMenuItemComponent } from './hotels-menu-item.component';

describe('HotelsMenuItemComponent', () => {
  let component: HotelsMenuItemComponent;
  let fixture: ComponentFixture<HotelsMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
