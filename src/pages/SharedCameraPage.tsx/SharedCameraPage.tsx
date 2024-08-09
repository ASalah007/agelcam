import {
  Button,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { StreamPlayer } from "../../components/StreamPlayer/StreamPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../types/enums/Paths";
import { PathSegments } from "../../types/enums/PathSegments";
import { useEffect, useState } from "react";
import { getSharedCamera } from "../../services/services";
import { SharedCamera } from "../../types/models/SharedCamera";

export const SharedCameraPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const sharedCameraId = params[PathSegments.SHARED_CAMERA_ID]!;
  const [sharedCamera, setSharedCamera] = useState<SharedCamera | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStreamFormat, setSelectedStreamFormat] = useState("mjpeg");

  useEffect(() => {
    setIsLoading(true);
    getSharedCamera(sharedCameraId).then((res: SharedCamera) => {
      setSharedCamera(res);
      setSelectedStreamFormat(res.streams?.[0]?.format);
    });
  }, [sharedCameraId]);

  const handleRecordingsClick = () => {
    const recordingPath = Paths.RECORDS.replace(
      `:${PathSegments.SHARED_CAMERA_ID}`,
      sharedCameraId
    );
    navigate(recordingPath);
  };

  const handleFormatChange = (e: SelectChangeEvent) => {
    setSelectedStreamFormat(e.target.value);
    setIsLoading(true);
  };

  return (
    <Stack gap="10px" minWidth="200px">
      <Typography textAlign="center" fontSize="16px">
        Live Stream
      </Typography>
      {isLoading && <LinearProgress />}
      {sharedCamera && (
        <StreamPlayer
          stream={
            sharedCamera.streams.find(
              (stream) => stream.format === selectedStreamFormat
            )!
          }
          onPlay={() => setIsLoading(false)}
        />
      )}
      <Stack direction="row" justifyContent="flex-end" gap="12px">
        <Select
          value={selectedStreamFormat}
          onChange={handleFormatChange}
          size="small"
        >
          {sharedCamera?.streams.map((stream) => (
            <MenuItem value={stream.format}>{stream.format}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleRecordingsClick}>
          Recordings
        </Button>
      </Stack>
    </Stack>
  );
};
