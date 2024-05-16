import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

let httpTestingController: HttpTestingController;

let idCounter = 0;

const generateProduct = () => ({
  id: ++idCounter,
  name: 'prod' + idCounter,
  price: 5,
  description: 'this is a test product',
});

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    expect(service.items).toHaveSize(0);

    service.addToCart(generateProduct());

    expect(service.items).toHaveSize(1);
  });

  it('should get items in the cart', () => {
    const prod1 = generateProduct();
    const prod2 = generateProduct();
    service.items.push(prod1);
    service.items.push(prod2);
    expect(service.items).toHaveSize(2);

    const cartItems = service.getItems();

    expect(cartItems).toHaveSize(2);
    expect(cartItems[0]).toBe(prod1);
    expect(cartItems[1]).toBe(prod2);
  });

  it('should clear the cart', () => {
    service.items.push(generateProduct());
    service.items.push(generateProduct());
    expect(service.items).toHaveSize(2);

    service.clearCart();

    expect(service.items).toHaveSize(0);
  });

  it('should get shipping costs', () => {
    const dummyPrices = [
      {
        type: 'Test Overnight',
        price: 25.99,
      },
      {
        type: 'Test 2-Day',
        price: 9.99,
      },
    ];

    // Make an HTTP GET request
    service.getShippingPrices().subscribe((data) => {
      // When observable resolves, result should match test data
      expect(data).toEqual(dummyPrices);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/assets/shipping.json');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(dummyPrices);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
