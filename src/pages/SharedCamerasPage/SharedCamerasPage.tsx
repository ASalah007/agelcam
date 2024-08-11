import { LinearProgress, Pagination, Stack, Typography } from "@mui/material";
import { SharedCamera } from "../../components/SharedCamera/SharedCamera";
import { useEffect, useState } from "react";
import { SharedCamera as ISharedCamera } from "../../types/models/SharedCamera";
import { getSharedCameras } from "../../services/services";
import { Paginated } from "../../types/models/Paginated";

const SHARED_CAMERAS_LIMIT = 5;

export const SharedCamerasPage = () => {
  const [sharedCameras, setSharedCameras] =
    useState<Paginated<ISharedCamera> | null>(null);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSharedCameras({
      limit: SHARED_CAMERAS_LIMIT,
      offset: page * SHARED_CAMERAS_LIMIT,
    })
      .then((res) => setSharedCameras(res))
      .finally(() => setIsLoading(false));
  }, [page]);

  const sharedCameraCount = sharedCameras?.count || 0;

  return (
    <Stack gap="12px">
      <Typography textAlign="center" pb="20px" fontSize="16px">
        Shared Cameras
      </Typography>

      {isLoading && <LinearProgress />}

      {sharedCameras?.results?.map((camera) => (
        <SharedCamera sharedCamera={camera} />
      ))}

      <Stack direction="row" justifyContent="center">
        <Pagination
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          count={Math.ceil(sharedCameraCount / SHARED_CAMERAS_LIMIT)}
        />
      </Stack>
    </Stack>
  );
};
