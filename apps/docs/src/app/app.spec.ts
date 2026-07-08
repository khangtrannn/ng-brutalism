import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, App],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });
});
