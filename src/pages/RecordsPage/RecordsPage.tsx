import { Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  getRecording,
  getRecordingStream,
  getRecordingTimeline,
} from "../../services/services";
import { PathSegments } from "../../types/enums/PathSegments";
import { useParams } from "react-router-dom";
import { RecordingInfo } from "../../types/models/RecordingInfo";
import { differenceInMinutes, format, intervalToDuration } from "date-fns";
import { Timeline } from "../../types/models/Timeline";
import { DateTimeRange } from "../../types/DateTimeRange";
import { RecordingStream } from "../../types/models/RecordingStream";
import classes from "./style.module.scss";

export const RecordsPage = () => {
  const [recordingInfo, setRecordingInfo] = useState<RecordingInfo | null>(
    null
  );
  const [recordsFrom, setRecordsFrom] = useState<Date | null>(null);
  const [recordsTo, setRecordsTo] = useState<Date | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [selectedStream, setSelectedStream] = useState<RecordingStream | null>(
    null
  );

  const params = useParams();
  const sharedCameraId = params[PathSegments.SHARED_CAMERA_ID]!;

  useEffect(() => {
    getRecording(sharedCameraId).then((res: RecordingInfo) => {
      setRecordingInfo(res);
      const recordingStart = new Date(res.recording_start);
      setRecordsFrom(recordingStart);
      setRecordsTo(new Date(recordingStart.getTime() + 24 * 59 * 60 * 1000));
    });
  }, [sharedCameraId]);

  useEffect(() => {
    if (!recordsFrom || !recordsTo) return;

    getRecordingTimeline(sharedCameraId, {
      start: recordsFrom?.toISOString(),
      end: recordsTo?.toISOString(),
    }).then((res) => setTimeline(res));
  }, [recordsFrom, recordsTo, sharedCameraId]);

  const handleSegmentClick = (params: DateTimeRange) => {
    getRecordingStream(sharedCameraId, params).then((res) =>
      setSelectedStream(res)
    );
  };

  return (
    <Stack gap="20px" padding="20px" overflow="auto">
      <Typography textAlign="center">Records</Typography>
      <Typography textAlign="center">
        Available from{" "}
        {new Date(recordingInfo?.recording_start || "").toLocaleString()} to{" "}
        {new Date(recordingInfo?.recording_end || "").toLocaleString()}
      </Typography>
      <ReactPlayer url={selectedStream?.url} playing controls />
      <Stack direction="row" justifyContent="center" gap="10px">
        <Typography component="span">Get Records From </Typography>
        {recordsFrom && (
          <input
            type="datetime-local"
            value={format(recordsFrom, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setRecordsFrom(new Date(e.target.value))}
          />
        )}
        <Typography component="span"> To </Typography>
        {recordsTo && (
          <input
            type="datetime-local"
            value={format(recordsTo, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setRecordsTo(new Date(e.target.value))}
          />
        )}
      </Stack>
      <Typography textAlign="center">Segments</Typography>
      <Stack gap="10px" maxHeight="200px" overflow="auto" alignItems="center">
        {timeline?.segments?.map((segment) => (
          <Paper
            className={classes.segment}
            onClick={() => handleSegmentClick(segment)}
            key={segment.start}
          >
            from {new Date(segment.start).toLocaleString()} to{" "}
            {new Date(segment.end).toLocaleString()} (
            {differenceInMinutes(segment.end, segment.start)}m)
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};
