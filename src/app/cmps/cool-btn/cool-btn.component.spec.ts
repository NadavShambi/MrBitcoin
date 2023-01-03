import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolBtnComponent } from './cool-btn.component';

describe('CoolBtnComponent', () => {
  let component: CoolBtnComponent;
  let fixture: ComponentFixture<CoolBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
