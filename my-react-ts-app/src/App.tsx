import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { router } from "./router/index";
import "@ant-design/icons";
function App() {
  return (
    <>
      <Suspense>{useRoutes(router)}</Suspense>
    </>
  );
}

export default App;
