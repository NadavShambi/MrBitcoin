import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBtnComponent } from './transfer-btn.component';

describe('TransferBtnComponent', () => {
  let component: TransferBtnComponent;
  let fixture: ComponentFixture<TransferBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
