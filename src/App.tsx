import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SharedCamerasPage } from "./pages/SharedCamerasPage/SharedCamerasPage";
import { LayoutPage } from "./pages/LayoutPage/LayoutPage";
import { Paths } from "./types/enums/Paths";
import { SharedCameraPage } from "./pages/SharedCameraPage.tsx/SharedCameraPage";
import { RecordsPage } from "./pages/RecordsPage/RecordsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayoutPage />}>
          <Route path={Paths.SHARED_CAMERAS} element={<SharedCamerasPage />} />
          <Route path={Paths.SHARED_CAMERA} element={<SharedCameraPage />} />
          <Route path={Paths.RECORDS} element={<RecordsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
