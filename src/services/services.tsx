import axios from "axios";

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

export const getSharedCameras = async (pagination: PaginationParams) => {
  const res = await api.get("/shared-cameras", { params: pagination });
  return res.data;
};

export const getSharedCamera = async (sharedCameraId: string | number) => {
  const res = await api.get(`/shared-cameras/${sharedCameraId}/`);
  return res.data;
};
