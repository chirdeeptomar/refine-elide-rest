import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import dataProvider from "../../src/index"
import { CategoryList, CategoryCreate, CategoryEdit, CategoryShow } from "./pages/categories";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ColorModeContextProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "coSGZ3-wzfw6r-Q2PMOE",
              }}
              resources={[
                {
                  name: "category",
                  list: "/categories",
                  show: "/categories/:id",
                  edit: "/categories/:id/edit",
                  create: "/categories/create",
                  meta: { label: "Categories" },
                },
                {
                  name: "post",
                  list: "/posts",
                  show: "/posts/:id",
                  edit: "/posts/:id/edit",
                  create: "/posts/create",
                  meta: { label: "Posts" },
                }
              ]}
            >
              <Routes>
                <Route index element={<NavigateToResource />} />
                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path=":id" element={<CategoryShow />} />
                  <Route path=":id/edit" element={<CategoryEdit />} />
                  <Route path="create" element={<CategoryCreate />} />
                </Route>
                <Route path="/posts">
                  <Route index element={<PostList />} />
                  <Route path=":id" element={<PostShow />} />
                  <Route path=":id/edit" element={<PostEdit />} />
                  <Route path="create" element={<PostCreate />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ColorModeContextProvider>
    </BrowserRouter >
  );
}

export default App;
