import { Component, Input, OnInit, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-snapshot-camera',
  templateUrl: './snapshot-camera.component.html',
  styleUrls: ['./snapshot-camera.component.css']
})
export class SnapshotCameraComponent implements OnInit, OnDestroy {

  video: HTMLVideoElement;

  canvas: HTMLCanvasElement;

  stream: MediaStream;

  @Input() width: number;

  @Input() height: number;

  @Output() snapshot = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    const elem = this.elementRef.nativeElement;

    this.video = <HTMLVideoElement>elem.querySelector('video');
    this.canvas = <HTMLCanvasElement>elem.querySelector('canvas');

    this.startSnapshot();
  }

  ngOnDestroy() {
    this.stopSnapshot();
  }

  startSnapshot() {
    const { video, canvas } = this;
    canvas.width = canvas.height = 0;

    canvas.hidden = true;
    video.hidden = false;

    navigator.getUserMedia({
      audio: false,
      video: {
        width: this.width,
        height: this.height
      }
    },
    (stream: MediaStream) => {
      this.stream = stream;
      video.src = URL.createObjectURL(stream);
      video.onloadedmetadata = (e) => {
        video.play();
      };
    },
    (err: MediaStreamError) => {
      console.error(err);
    });
  }

  stopSnapshot() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.video.src = null;
  }

  takeSnapshot() {
    const { canvas, video, width, height } = this;
    const { videoWidth, videoHeight } = video;

    canvas.hidden = false;
    video.hidden = true;

    const scale = width / videoWidth;

    canvas.width = videoWidth * scale;
    canvas.height = videoHeight * scale;

    canvas.onclick = () => this.startSnapshot();
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.snapshot.emit({
      width: canvas.width,
      height: canvas.height,
      dataURL: canvas.toDataURL()
    });
  }
}
