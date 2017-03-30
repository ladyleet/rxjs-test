import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuggestionComponent } from './dialog-suggestion.component';

describe('DialogSuggestionComponent', () => {
  let component: DialogSuggestionComponent;
  let fixture: ComponentFixture<DialogSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
