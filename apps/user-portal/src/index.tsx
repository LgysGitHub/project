import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './actions/store'
import App from './App'
import 'antd/dist/antd.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// https://github.com/ant-design/ant-design/issues/26136
// TODO: add back <React.StrictMode> when the antd issue has been resolved
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
)
