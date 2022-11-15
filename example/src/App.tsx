import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "./lib"

import "@pankod/refine-antd/dist/styles.min.css";
import { PostList } from "./pages/posts/list";
import { PostShow } from "./pages/posts/show";
import { PostEdit } from "./pages/posts/edit";
import { PostCreate } from "./pages/posts/create";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.elide.refine.dev/v1")}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[{
        name: "post", list: PostList, show: PostShow, edit: PostEdit, create: PostCreate
      }]}
    />
  );
};

export default App;
