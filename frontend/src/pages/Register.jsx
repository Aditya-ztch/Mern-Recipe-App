import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Gender,SetGender]=useState('')

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim()) {
      setError('First name is required')
      toast.error('First name is required')
      return
    }
    if (!lastName.trim()) {
      setError('Last name is required')
      toast.error('Last name is required')
      return
    }
    if (!Password.trim()) {
      setError('Password is required')
      toast.error('Password is required')
      return
    }
    if (!country.trim()) {
      setError('Country is required')
      toast.error('Country is required')
      return
    }
    if (!city.trim()) {
      setError('City is required')
      toast.error('City is required')
      return
    }
    if (!phone.trim()) {
      setError('Phone number is required')
      toast.error('Phone number is required')
      return
    }
    if (!email.trim()) {
      setError('Email is required')
      toast.error('Email is required')
      return
    }

    // UI-only for now. Replace with real API call when backend is ready.
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      country: country.trim(),
      city: city.trim(),
      phone: phone.trim(),
      email: email.trim(),
      Password:Password.trim(),
      Gender:Gender
      
    }

    console.log('Register payload:', payload)
    toast.success('Registration successful!')
    navigate('/')
  }

  return (
    <div
      className="register-page"
      style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}
    >
      <h2 style={{ marginBottom: 8 }}>Register</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Create your account.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              autoComplete="given-name"
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span>Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              autoComplete="family-name"
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
            <span>Password</span>
            <input
              type="password"
              value={Password}
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="family-name"
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

           <label style={{ display: 'grid', gap: 6 }}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label>

         


          
        </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
           <label style={{ display: 'grid', gap: 6 }}>
            <span>Country</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="India"
              autoComplete="country-name"
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>
          
            <label style={{ display: 'grid', gap: 6 }}>
            <span>City</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai"
              autoComplete="address-level2"
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

        
         </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={{ display: 'grid', gap: 6 }}>
            <span>Phone Number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +1 555 123 4567"
            autoComplete="tel"
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </label></div>
        <div>
           <label style={{ display: 'grid', gap: 6 }}>
          <span>Gender</span></label>
          <div style={{display:'flex'}}>
            <div style={{display:'flex',margin:'1em'}}>
            <input
            type="radio"
            name='gender'
            onChange={(e) => SetGender(e.target.value)}
            value="Male"
            id='Male'
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          /><label htmlFor='Male'>Male</label>
          </div>
           <div style={{display:'flex',margin:'1em'}}>
            <input
            type="radio"
            name='gender'
            value="Female"
            onChange={(e) => SetGender(e.target.value)}
            id='Female'
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          /><label htmlFor='Female'>Female</label>
          </div>
          <div style={{display:'flex',margin:'1em'}}>
            <input
            type="radio"
            name='gender'
            value="Other"
            onChange={(e) => SetGender(e.target.value)}
            id='Other'
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          /><label htmlFor='Other'>Other</label>
          </div>
          </div>
          

        </div>
          
       
        
          </div>
      

       

        {error ? (
          <div role="alert" style={{ color: '#b00020', fontSize: 14 }}>
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: '#16a34a',
            color: 'white',
            fontWeight: 700,
          }}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register

