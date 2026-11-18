import { useState } from 'react'

export default function Login({ role = 'customer', onLogin, onSwitchRole, onBack }) {
  const [email, setEmail] = useState(role === 'admin' ? 'admin@travo.com' : '')
  const [password, setPassword] = useState(role === 'admin' ? 'Admin@123' : '')
  const [privacy, setPrivacy] = useState(false)
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!privacy) return setError('Please accept the privacy and data policy.')
    if (role === 'admin' && (email !== 'admin@travo.com' || password !== 'Admin@123')) {
      return setError('Invalid admin credentials. Use the demo credentials shown below.')
    }
    if (password.length < 6) return setError('Password must contain at least 6 characters.')
    onLogin({ role, name: role === 'admin' ? 'Travo Administrator' : email.split('@')[0], email })
  }

  return (
    <section className="login-page">
      <div className="login-visual">
        <button className="login-back" onClick={onBack}>← Back to Travo</button>
        <div className="login-visual-copy"><span>More joy in every journey</span><h1>{role === 'admin' ? 'Manage every adventure.' : 'Your next adventure awaits.'}</h1></div>
      </div>
      <main className="login-card-wrap">
        <form className="login-card" onSubmit={submit}>
          <div className="login-brand"><span className="brand-mark">T</span><strong>Travo</strong></div>
          <span className="section-kicker">{role === 'admin' ? 'Administrator portal' : 'Customer portal'}</span>
          <h2>{role === 'admin' ? 'Welcome back, Admin' : 'Welcome to Travo'}</h2>
          <p>{role === 'admin' ? 'Sign in to manage bookings and notifications.' : 'Sign in to plan and manage your journeys.'}</p>

          {role === 'customer' && <div className="role-switch"><button type="button" className="active">Customer login</button><button type="button" onClick={() => onSwitchRole('admin')}>Admin login</button></div>}
          {role === 'admin' && <div className="role-switch"><button type="button" onClick={() => onSwitchRole('customer')}>Customer login</button><button type="button" className="active">Admin login</button></div>}

          <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="name@example.com"/></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Enter your password"/></label>
          <label className="privacy-check"><input type="checkbox" checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} /><span>I agree to the <button type="button">Privacy Policy</button> and data terms.</span></label>
          {error && <p className="login-error">{error}</p>}
          <button className="login-submit" type="submit">Sign in securely <span>→</span></button>
          {role === 'admin' && <div className="demo-admin"><span>Demo admin credentials</span><strong>admin@travo.com · Admin@123</strong></div>}
        </form>
      </main>
    </section>
  )
}
