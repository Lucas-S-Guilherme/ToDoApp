import React from "react";
import { ToDoProvider } from "./ToDoApp";
import HomeScreen from "./HomeScreen";

const App = () => {
  return (
    <ToDoProvider>
      <HomeScreen />
    </ToDoProvider>
  );
};

export default App;