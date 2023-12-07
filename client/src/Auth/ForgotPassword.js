import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ onClose }) => {
  const [passwordData, setPasswordData] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (passwordData.newpassword !== passwordData.confirmpassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:5000/insert', {
        newpassword: passwordData.newpassword,
        confirmpassword: passwordData.confirmpassword,
      });

      console.log(response);
      setPasswordChanged(true);
      setError('');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (passwordChanged) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f2f2f2',
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Password Successfully Changed
          </h1>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Your password has been updated successfully.
          </p>
          <Link to="/LoginPage">
            
          <button
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '4px',
              backgroundColor: '#4caf50',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
            }}
            // onClick={() => setPasswordChanged(false)}
          >
            Back to Login
          </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="newpassword"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              New Password
            </label>
            <input
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
              type="password"
              id="newpassword"
              name="newpassword"
              placeholder="Enter new password"
              value={passwordData.newpassword}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="confirmpassword"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Confirm Password
            </label>
            <input
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm new password"
              value={passwordData.confirmpassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p
              style={{
                color: 'red',
                fontSize: '14px',
                marginBottom: '10px',
              }}
            >
              {error}
            </p>
          )}
          <div style={{ textAlign: 'center' }}>
            <button
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                backgroundColor: '#4caf50',
                color: '#ffffff',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default App;