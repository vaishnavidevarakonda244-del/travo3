import Login from './Login'

export default function AdminLogin({ onLogin, onBack, onCustomerLogin }) {
  return <Login role="admin" onLogin={onLogin} onSwitchRole={onCustomerLogin} onBack={onBack}/>
}
