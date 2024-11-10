import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import Layout from "./public/layout/layout";
import { Provider } from "react-redux";
import { store } from "./context/store";
function App() {
    return (
        <Layout>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>

            <h1>dev</h1>
        </Layout>
    );
}

export default App;
