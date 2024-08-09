import { Button, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import { StreamPlayer } from "../../components/StreamPlayer/StreamPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../types/enums/Paths";
import { PathSegments } from "../../types/enums/PathSegments";

export const SharedCameraPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleRecordingsClick = () => {
    const recordingPath = Paths.RECORDS.replace(
      PathSegments.SHARED_CAMERA_ID,
      params[PathSegments.SHARED_CAMERA_ID.replace(":", "")]!
    );
    navigate(recordingPath);
  };

  return (
    <Stack gap="10px">
      <StreamPlayer streams={SHARED_CAMERA.streams} />
      <Button variant="contained" onClick={handleRecordingsClick}>
        Recordings
      </Button>
    </Stack>
  );
};

const SHARED_CAMERA = {
  id: 112859,
  name: "Street",
  type: "h264",
  snapshot: {
    url: "https://d1bkj0vwu8cp7q.cloudfront.net/snapshot/112859/20240808-183105-0f0f365c-10ea-4304-81e4-276e28aa4bb2.jpg",
    created_at: "2024-08-08T18:31:05Z",
  },
  status: "online",
  live_snapshot:
    "https://m3-eu8.angelcam.com/cameras/112859/snapshots/snapshot.jpg?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMTQyNjI2NDMwMzA4LCJ0aW1lb3V0IjoxMjB9%2E57dae27b2cfa7164db2d6dc1af229172cd4141aaff12bce155dab140a21f520f",
  streams: [
    {
      format: "mjpeg",
      url: "https://m3-eu8.angelcam.com/cameras/112859/streams/mjpeg/stream.mjpeg?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMTQyNjI2NDMwMzc2LCJ0aW1lb3V0IjoxMjB9%2E14c1136fa65375c353ef706b20025f63fbae4622113487775c8bc101b9fcfda8",
    },
    {
      format: "mp4",
      url: "https://m3-eu8.angelcam.com/cameras/112859/streams/mp4/stream.mp4?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMTQyNjI2NDMwNDA5LCJ0aW1lb3V0IjoxMjB9%2Ea0fc4bff1ff75b897945978f2f90fc5fe531bc0931df51331a414f7afcbc3136",
    },
    {
      format: "mpegts",
      url: "https://m3-eu8.angelcam.com/cameras/112859/streams/mpegts/stream.ts?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMTQyNjI2NDMwNDM2LCJ0aW1lb3V0IjoxMjB9%2E78a4b0cf03e57c2fb09bc4d734f837738810149207020251a37613d99b61dd57",
    },
    {
      format: "hls",
      url: "https://m3-eu8.angelcam.com/cameras/112859/streams/hls/playlist.m3u8?token=eyJjYW1lcmFfaWQiOiIxMTI4NTkiLCJkZXZpY2VfaWQiOiIxMTI4NTkiLCJ0aW1lIjoxNzIzMTQyNjI2NDMwNDYxLCJ0aW1lb3V0IjozNjAwfQ%3D%3D%2E525f1b84347d266a3097757929f303bd85f881dd1dace6b9e241ea44770e2881",
    },
  ],
  applications: [
    {
      code: "CRA",
    },
  ],
  owner: {
    email: "hiring@angelcam.com",
    first_name: "Angelcam",
    last_name: "Hiring",
  },
  has_recording: true,
  has_notifications: false,
  audio_enabled: true,
  low_latency_enabled: true,
};
