import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import DashboardPage from './pages/DashboardPage'

export const routes = [
  {path: '/', component: HomePage, name: 'home'},
  {path: '/login', component: LoginPage, name: 'loginPage'},
  {path: '/logout', component: LogoutPage, name: 'logoutPage'},
  {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: {requiresAuth: true}}
]
