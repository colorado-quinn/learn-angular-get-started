import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    expect(service.items).toHaveSize(0);

    service.addToCart({
      id: 1,
      name: 'test',
      price: 5,
      description: 'this is a test product',
    });

    expect(service.items).toHaveSize(1);
  });
});
