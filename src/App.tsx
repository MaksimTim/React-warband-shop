import "./scss/app.scss";
import React, { Suspense } from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Pages/NotFound";

const Cart = React.lazy(() => import("./Pages/Cart"));
const FullPizza = React.lazy(() => import("./Pages/FullPizza"));

function App() {
  return (
    <Suspense fallback={<div>Идёт загрузка...</div>}>
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route path={""} element={<Home />} />
          <Route path={"cart"} element={<Cart />} />
          <Route path={"pizza/:id"} element={<FullPizza />} />
          <Route path={"*"} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
