import { Stack, Typography } from "@mui/material";
import { SharedCamera as ISharedCamera } from "../../types/models/SharedCamera";
import { useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/enums/Paths";
import { PathSegments } from "../../types/enums/PathSegments";

interface SharedCameraProps {
  sharedCamera: ISharedCamera;
}

const LIVE_SNAPSHOT_UPDATE_INTERVAL = 1200;

export const SharedCamera = (props: SharedCameraProps) => {
  const navigate = useNavigate();

  const handleSharedCameraClick = () => {
    const sharedCameraPath = Paths.SHARED_CAMERA.replace(
      PathSegments.SHARED_CAMERA_ID,
      props.sharedCamera.id.toString()
    );
    navigate(sharedCameraPath);
  };

  const [refreshKey, setRefreshKey] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const liveSnapshotRef = useRef(0);
  const handleMouseEnter = () => {
    if (isHovering) return;
    setIsHovering(true);
    liveSnapshotRef.current = setInterval(
      () => setRefreshKey((old) => ++old),
      LIVE_SNAPSHOT_UPDATE_INTERVAL
    );
    console.log("enter", liveSnapshotRef.current);
  };

  const handleMouseLeave = () => {
    clearInterval(liveSnapshotRef.current);
    setIsHovering(false);
    console.log("leave", liveSnapshotRef.current);
  };

  useEffect(() => {
    return () => {
      console.log("clear");
      clearInterval(liveSnapshotRef.current);
    };
  }, []);

  return (
    <Stack
      direction="row"
      className={classes.sharedCamera}
      onClick={handleSharedCameraClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      gap="12px"
    >
      <img
        src={props.sharedCamera.live_snapshot + `&refreshKey=${refreshKey}`}
        alt="stream-snapshot"
        width="150px"
        height="84px"
      />

      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{props.sharedCamera.name}</Typography>
          <Stack direction="row"></Stack>
        </Stack>
        <Typography fontSize="12px" color="#94a3b8">
          {`${props.sharedCamera.owner.first_name} ${props.sharedCamera.owner.last_name}`}
        </Typography>

        <Typography fontSize="12px" color="#94a3b8">
          {props.sharedCamera.type}
        </Typography>
      </Stack>
    </Stack>
  );
};
