import App from './App'
import Home from './Home'
import Navigator from './Navigator'

export { App, Home, Navigator }

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]
