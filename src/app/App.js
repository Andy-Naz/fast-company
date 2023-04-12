import React from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/navBar"
import Main from "./layouts/main"
import Login from "./layouts/login"
import Users from "./layouts/users"

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    )
}

export default App
