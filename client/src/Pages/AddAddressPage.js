import React, { useState } from 'react';
import axios from 'axios';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAddressPage = ({onClose, onSelectAddress}) => {
  const initialFormData = {
    fullName: '',
    mobileNumber: '',
    addressLine: '',
    area: '',
    town: '',
    state: '',
    country: '',
    pincode: '',
    isDefaultAddress: false,
  };

  
  
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedAddress,] = useState(null);

  // State and country options
  const stateOptions = ['State 1', 'State 2', 'State 3']; // Replace with actual state options
  const countryOptions = ['Country 1', 'Country 2', 'Country 3']; // Replace with actual country options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.fullName ||
      !formData.mobileNumber ||
      !formData.addressLine ||
      !formData.area ||
      !formData.town ||
      !formData.state ||
      !formData.country ||
      !formData.pincode
    ) {
      setError('Please fill in all fields');
      return;
    }

    addAddress();
  };

  const addAddress = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5004/insert', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
    toast.success('Address added successfully'); // Display a success toast
    setError('');
    onSelectAddress(response.data); // Update the selected address
    resetForm();
  } catch (error) {
    console.error(error);
    setError('Internal Server Error');
    toast.error('An error occurred while adding the address'); // Display an error toast
  } finally {
    setSubmitting(false);
  }
};

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <section>
   
      {showPopup && (
        <div
          className="container"
          style={{
            width: '600px',
            height: '620px',
            top: '50px',
            left: '10px',
            borderRadius: '30px',
            border: '1px solid #BBBBBB',
            position: 'relative',
            zIndex: 999,
          }}
        >
          <button
            onClick={handleClosePopup}
            style={{
              position: 'relative',
               right: '10px',
              top:'-365px',
              left:'550px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: 'px solid #000',
              background: showPopup ? 'white' : 'none', // Adjust the colors as needed
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {showPopup && <span style={{ fontSize: '12px' }}>X</span>}
          </button>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="h1">
              <label
                style={{
                  backgroundColor: '#BBBBBB',
                  fontFamily: 'Open Sans',
                  fontSize: '24px',
                  fontWeight: 600,
                  padding: '8px',
                  paddingLeft: '8px',
                  paddingRight: '290px',
                  lineHeight: '45px',
                  letterSpacing: '0em',
                  borderRadius: '22px',
                  display: 'flex',
                  
                  alignItems: 'left',
                  justifyContent: 'left',
                }}
              >
                Enter a new delivery address
              </label>
              <br />
            </div>
            <h3 style={{ paddingRight: '320px' }}>Add a new delivery address</h3>
            <br />
            <div style={{ display: 'flex', gap: '10px' }}>

              <div className="form-group">
                <label htmlFor="fullName"><b>Full Name</b></label>
                <br />
                <input
                  type="text"
                  id="fullName"
                  name="fullName" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '250px',
                    height: '30px',
                    marginLeft: '20px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber"><b>Mobile Number</b></label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  style={{
                    width: '250px',
                    height: '30px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="addressLine"><b>Flat, House no., Building, Company, Apartment</b></label>
              <input
                type="text"
                id="addressLine"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                style={{
                  width: '545px',
                  height: '35px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <br />
            <div style={{ display: 'flex', gap: '0px' }}>
              <div className="form-group">
                <label htmlFor="area"><b>Area, Street, Sector, Village</b></label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  style={{
                    width: '250px',
                    height: '30px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    marginRight: '30px',
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="town"><b>Town/City</b></label>
                <input
                  type="text"
                  id="town"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  required
                  style={{
                    width: '250px',
                    height: '30px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    marginRight: '20px',
                  }}
                />
              </div>
            </div>
            <br />
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="state"><b>State</b></label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  style={{
                    width: '250px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    marginLeft: '20px',
                  }}
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="country"><b>Country</b></label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={{
                    width: '238px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="form-group">
              <div style={{ display: 'flex', gap: '10px' }}>
                <label htmlFor="pincode"><b>Pincode</b></label>
              </div>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                style={{
                  width: '238px',
                  height: '32px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  marginRight: '290px',
                }}
              />
            </div>
            <br />
            <div className="checkbox">
              <input
                type="checkbox"
                id="isDefaultAddress"
                name="isDefaultAddress"
                checked={formData.isDefaultAddress}
                onChange={handleCheckboxChange}
                style={{ marginRight: '8px' }}
              />
              <label
                htmlFor="isDefaultAddress"
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '33px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  marginRight: '300px',
                }}
              >
                Make this default address
              </label>
            </div>
            {error && <p className="error-message">{error}</p>}
         
            <button
              type="submit"
              disabled={submitting || selectedAddress !== null}
              style={{
                marginTop: '12px',
                width: '150px',
                padding: '1px',
                borderRadius: '4px',
                border: 'none',
                background: '',
                color: '#FFFFFF',
                cursor: 'pointer',
                marginRight: '380px',
              }}
              onClick={() => {
                if (selectedAddress === null) {
                    console.log('button clicked');
                  toast.error('Please select an address before proceeding.');
                } else if (!submitting) {
                  addAddress();
                }
              }}
            >
              {submitting ? 'Adding...' : 'Use The Address'}
            </button>
        
          </form>
        </div>
      )}</section>
 
  );
};

export default AddAddressPage;