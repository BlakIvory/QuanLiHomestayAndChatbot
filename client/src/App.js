import { Route, Routes } from "react-router-dom";

import { Home, Login, Register } from "./containers/Public";

import { path } from "./ultils/constant";

function App() {
  return (
    <div className="h-screen w-full bg-primary ">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.REGISTER} element={<Register />}></Route>
        </Route>
        {/* <Route path=""></Route> */}
      </Routes>
    </div>
  );
}

export default App;
