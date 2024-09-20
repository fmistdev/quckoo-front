import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-webcam',
  standalone: true,
  imports: [],
  templateUrl: './webcam.component.html',
  styleUrl: './webcam.component.scss'
})
export class WebcamComponent implements OnInit {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isCameraActive = false;

  constructor() {}

  ngOnInit(): void {}

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
          this.isCameraActive = true;
        })
        .catch(err => {
          console.error("Error accessing webcam: ", err);
        });
    } else {
      alert("Webcam non supportée dans ce navigateur.");
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
      this.isCameraActive = false;
    }
  }
}
