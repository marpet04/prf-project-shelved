import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementAddModalComponent } from './element-add-modal.component';

describe('ElementAddModalComponent', () => {
  let component: ElementAddModalComponent;
  let fixture: ComponentFixture<ElementAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
