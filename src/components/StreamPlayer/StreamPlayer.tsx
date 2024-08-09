import ReactPlayer from "react-player";
import { Stream } from "../../types/models/Stream";
import React from "react";
import { Typography } from "@mui/material";

interface StreamPlayerProps {
  stream: Stream;
  onPlay: () => void;
}

export const StreamPlayer = (props: StreamPlayerProps) => {
  if (props.stream.format === "mjpeg")
    return <img onLoad={props.onPlay} src={props.stream.url} width="920px" />;

  if (!ReactPlayer.canPlay(props.stream.url)) {
    props.onPlay();
    return <Typography>Format Not Supported</Typography>;
  }

  return <ReactPlayer url={props.stream.url} playing onPlay={props.onPlay} />;
};
