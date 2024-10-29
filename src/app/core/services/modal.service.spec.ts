import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should show the modal with message and error state', () => {
      const message = 'Test message';
      const isError = true;

      service.show(message, isError);

      service.modalMessage$.subscribe((msg) => {
        expect(msg).toBe(message);
      });

      service.showModal$.subscribe((show) => {
        expect(show).toBeTrue();
      });

      service.isError$.subscribe((error) => {
        expect(error).toBe(isError);
      });
    });
  });

  describe('hide', () => {
    it('should hide the modal', () => {
      service.show('Test message', false);
      service.hide();

      service.showModal$.subscribe((show) => {
        expect(show).toBeFalse();
      });
    });
  });
});
