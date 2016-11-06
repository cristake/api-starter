// import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LogoutPage from './pages/LogoutPage'
import DashboardPage from './pages/DashboardPage'

export const routes = [
  // { path: '*', component: NotFoundPage, name: 'notFoundPage' },
  {path: '/', component: HomePage, name: 'home'},
  {path: '/login', component: LoginPage, name: 'loginPage'},
  {path: '/register', component: RegisterPage, name: 'registerPage'},
  {path: '/logout', component: LogoutPage, name: 'logoutPage'},
  {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: {requiresAuth: true}, alias: ['/admin']}
]
