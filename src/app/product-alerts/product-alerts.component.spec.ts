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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should show button for product costing 701', () => {
    sut.product = {
      id: 1,
      description: 'test',
      name: 'Name1',
      price: 701,
    };
    fixture.detectChanges();

    const productAlertsElement: HTMLElement = fixture.nativeElement;
    const button = productAlertsElement.querySelector('button');
    expect(button)
      .withContext('"Notify me" button should be shown')
      .toBeTruthy();
    expect(button?.textContent).toEqual('Notify Me');
  });

  it('should not show button for product costing 700', () => {
    sut.product = {
      id: 1,
      description: 'test',
      name: 'Name1',
      price: 700,
    };
    fixture.detectChanges();

    const productAlertsElement: HTMLElement = fixture.nativeElement;
    const button = productAlertsElement.querySelector('button');
    expect(button)
      .withContext('"Notify me" button should NOT be shown')
      .toBeNull();
  });
});
