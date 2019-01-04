import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['SelectedVideo']
})
export class VideoListComponent implements OnInit {

  public SelectedVideo = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  onSelect(vid: Video) {
    this.SelectedVideo.emit(vid)
  }

}
