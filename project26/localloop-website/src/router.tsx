import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { Quests } from "./pages/Quests";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discover", element: <Discover /> },
      { path: "/quests", element: <Quests /> }
    ]
  }
]);

