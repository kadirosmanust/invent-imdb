import type { Route } from "@/types/route";
import { LazyHome, LazyDetail } from "./lazyRoutes";

export const ROUTES : Route[] = [
  {
    path: "/",
    index: true,
    element: <LazyHome />,
    id: "HOME_PAGE",
  },
  {
    path: "/media/:imdbID",
    element: <LazyDetail />,
    id: "MEDIA_PAGE",
  }
];
