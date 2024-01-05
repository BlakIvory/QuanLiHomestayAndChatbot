import "./App.css"

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import SideMenu from "./components/SideMenu";
import PageContent from "./components/PageContent";
import { Space } from "antd";

function App() {
  return (
    <div className=" App bg-primary ">
        <AppHeader></AppHeader>
        <Space className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </Space>
        <AppFooter></AppFooter>
    </div>
  );
}

export default App;
