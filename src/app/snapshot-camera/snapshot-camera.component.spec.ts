import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotCameraComponent } from './snapshot-camera.component';

describe('SnapshotCameraComponent', () => {
  let component: SnapshotCameraComponent;
  let fixture: ComponentFixture<SnapshotCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
