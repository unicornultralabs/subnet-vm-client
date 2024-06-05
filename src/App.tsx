import { Route, Routes } from "react-router-dom";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Home from "./page/Home";


const App = () => {
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </FormProvider>
    </>
  );
};
export default App;
