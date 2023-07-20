import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import "bootstrap/dist/css/bootstrap.css"
import App from "./app/App"
import { Router } from "react-router-dom/cjs/react-router-dom.min"
import { createStore } from "./app/store/createStore"
import { Provider } from "react-redux"
import history from "./app/utils/history"

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
