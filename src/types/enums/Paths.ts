import { PathSegments } from "./PathSegments";

export enum Paths {
  SHARED_CAMERAS = "/shared-cameras",
  SHARED_CAMERA = `/shared-camera/${PathSegments.SHARED_CAMERA_ID}`,
  RECORDS = `/records/${PathSegments.SHARED_CAMERA_ID}`,
}
