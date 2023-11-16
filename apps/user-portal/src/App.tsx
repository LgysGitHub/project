import { ReactElement, useRef } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Routes } from './constants'

// import { MainLayout } from './layouts'
import { HomePage } from './pages/HomePage'
import { UserPage } from './pages/UserPage'

export default function App(): ReactElement {
  const appRef = useRef(null)

  return (
    <div
      className='__App__'
      ref={appRef}
    >
      {/* <MainLayout>
        <Switch>
          <Route path={`${Routes.Home}`}>
            <HomePage />
          </Route>

          <Redirect to='/' />
        </Switch>
      </MainLayout> */}

      <Switch>
        <Route path={`${Routes.Home}`}>
          <HomePage />
        </Route>

        <Route path={`${Routes.User}`}>
          <UserPage/>
        </Route>

        <Redirect to='/' />
      </Switch>
    </div>
  )
}
