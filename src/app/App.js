import React from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/ui/navBar"
import Main from "./layouts/main"
import Login from "./layouts/login"
import Users from "./layouts/users"

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
            </Switch>
        </>
    )
}

export default App
