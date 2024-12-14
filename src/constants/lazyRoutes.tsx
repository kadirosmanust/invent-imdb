import React from "react";

export const LazyHome = React.lazy(() => import("../pages/Home"));
export const LazyDetail = React.lazy(() => import("../pages/Detail"));

