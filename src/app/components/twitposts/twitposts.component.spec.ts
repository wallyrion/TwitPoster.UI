import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitpostsComponent } from './twitposts.component';

describe('TwitpostsComponent', () => {
  let component: TwitpostsComponent;
  let fixture: ComponentFixture<TwitpostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwitpostsComponent],
    });
    fixture = TestBed.createComponent(TwitpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
