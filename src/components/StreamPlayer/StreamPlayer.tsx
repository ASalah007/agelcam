import ReactPlayer from "react-player";

interface StreamPlayerProps {
  streams: { url: string; format: string }[];
}

export const StreamPlayer = (props: StreamPlayerProps) => {
  return <img src={props.streams[0].url} width="920px" />;
  return <ReactPlayer url={props.streams[1].url} playing />;
};
