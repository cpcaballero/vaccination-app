import { Suspense } from "react"
import "./App.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import routes from "./utils/routes.js"
import { AuthProvider } from "./context/auth"
import AppRoute from "./components/AppRoute"
import { Spinner } from "./components/Spinner"

const App = () => {
  return (<>
    <AuthProvider>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map((route) => (
              <AppRoute
                exact
                key={route.path}
                path={route.path}
                content={route.content}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  </>)
}

export default App
