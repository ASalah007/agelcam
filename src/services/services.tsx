import axios from "axios";
import { RecordingStream } from "../types/models/RecordingStream";
import { Timeline } from "../types/models/Timeline";
import { RecordingInfo } from "../types/models/RecordingInfo";
import { SharedCamera } from "../types/models/SharedCamera";
import { Paginated } from "../types/models/Paginated";
import { DateTimeRange } from "../types/DateTimeRange";

const api = axios.create({
  baseURL: "https://api.angelcam.com/v1/",
  headers: {
    Authorization:
      "PersonalAccessToken afc5645abb59f757703aa5070a7c4d0a2919e276",
  },
});

interface PaginationParams {
  limit: number;
  offset: number;
}

export const getSharedCameras = async (
  pagination: PaginationParams
): Promise<Paginated<SharedCamera>> => {
  const res = await api.get("/shared-cameras", { params: pagination });
  return res.data;
};

export const getSharedCamera = async (
  sharedCameraId: string | number
): Promise<SharedCamera> => {
  const res = await api.get(`/shared-cameras/${sharedCameraId}/`);
  return res.data;
};

export const getRecording = async (
  sharedCameraId: string | number
): Promise<RecordingInfo> => {
  const res = await api.get(`/shared-cameras/${sharedCameraId}/recording/`);
  return res.data;
};

export const getRecordingTimeline = async (
  sharedCameraId: string | number,
  params: DateTimeRange
): Promise<Timeline> => {
  const res = await api.get(
    `/shared-cameras/${sharedCameraId}/recording/timeline`,
    { params }
  );
  return res.data;
};

export const getRecordingStream = async (
  sharedCameraId: string | number,
  params: DateTimeRange
): Promise<RecordingStream> => {
  const res = await api.get(
    `/shared-cameras/${sharedCameraId}/recording/stream/`,
    { params }
  );
  return res.data;
};
