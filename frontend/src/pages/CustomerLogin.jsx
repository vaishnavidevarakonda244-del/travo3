import Login from './Login'

export default function CustomerLogin({ onLogin, onBack, onAdminLogin }) {
  return <Login role="customer" onLogin={onLogin} onSwitchRole={onAdminLogin} onBack={onBack}/>
}
