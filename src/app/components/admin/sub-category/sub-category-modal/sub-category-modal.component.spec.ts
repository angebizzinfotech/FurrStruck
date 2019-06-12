import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryModalComponent } from './sub-category-modal.component';

describe('SubCategoryModalComponent', () => {
  let component: SubCategoryModalComponent;
  let fixture: ComponentFixture<SubCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
