export interface RecordingStream {
  format: string;
  url: string;
  stream_info: string;
  stream_controls: {
    base_url: string;
    play: string;
    pause: string;
    speed:string;
  };
}
