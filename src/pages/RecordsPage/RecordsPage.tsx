import { Stack } from "@mui/material";
import ReactPlayer from "react-player";

export const RecordsPage = () => {
  return (
    <Stack gap="10px">
      records
      <ReactPlayer
        url="https://e3-eu2.angelcam.com/recording/streams/9ad026a1-0080-435d-bb36-b3c0acef59d8/hls/playlist.m3u8"
        playing
        // controls
      />
    </Stack>
  );
};
