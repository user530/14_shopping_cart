import React from "react";
import { useAppContext } from "./context";

import Navbar from "./Navbar";
import CartContainer from "./CartContainer";

const App = () => {
  const { loading } = useAppContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
