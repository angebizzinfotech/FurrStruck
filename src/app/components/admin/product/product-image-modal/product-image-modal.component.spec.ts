import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageModalComponent } from './product-image-modal.component';

describe('ProductImageModalComponent', () => {
  let component: ProductImageModalComponent;
  let fixture: ComponentFixture<ProductImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
