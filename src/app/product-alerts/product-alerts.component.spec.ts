import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAlertsComponent } from './product-alerts.component';

describe('ProductAlertsComponent', () => {
  let sut: ProductAlertsComponent;
  let fixture: ComponentFixture<ProductAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAlertsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAlertsComponent);
    sut = fixture.componentInstance;
    const testProduct = {
      id: 1,
      description: 'test',
      name: 'Name1',
      price: sut.MIN_PRICE,
    };
    sut.product = testProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should show button for product costing min price', () => {
    const productAlertsElement: HTMLElement = fixture.nativeElement;
    const button = productAlertsElement.querySelector('button');
    expect(button)
      .withContext('"Notify me" button should be shown')
      .toBeTruthy();
    expect(button?.textContent).toEqual('Notify Me');
  });

  it('should not show button for product costing below min price', () => {
    sut.product!.price = sut.MIN_PRICE - 1;
    fixture.detectChanges();

    const productAlertsElement: HTMLElement = fixture.nativeElement;
    const button = productAlertsElement.querySelector('button');
    expect(button)
      .withContext('"Notify me" button should NOT be shown')
      .toBeNull();
  });
});
