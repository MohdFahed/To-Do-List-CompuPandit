import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailogComponent } from './edit-dailog.component';

describe('EditDailogComponent', () => {
  let component: EditDailogComponent;
  let fixture: ComponentFixture<EditDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDailogComponent]
    });
    fixture = TestBed.createComponent(EditDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
