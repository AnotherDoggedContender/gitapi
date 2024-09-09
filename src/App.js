import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
function App() {
    return (
    <RouterProvider router={router} />;
    <h1>dev</h1>
    );
}

export default App;
