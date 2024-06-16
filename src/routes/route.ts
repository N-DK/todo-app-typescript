import React from "react";
import { Home } from "../views/Home";

type Route = {
  path: string;
  component: React.FC;
};

export const publicRoutes: Route[] = [{ path: "", component: Home }];

export const privateRoutes = [];
