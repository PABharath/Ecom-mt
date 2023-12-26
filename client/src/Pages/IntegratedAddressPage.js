import React, { useState, useEffect, useContext } from "react";
import { useNavigate,useLocation} from "react-router-dom";
import AddressView from "./AddressView";
import { Country, State } from "country-state-city";
import "./IntegratedAddressPage.css";
import { CartContext } from "./CreateContext";
import axios from "axios";
import Navbar2 from './Navbar2';


const IntegratedAddressPage = () => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [email,] = useState(localStorage.getItem('email'));

  // const { cartItems } = useContext(CartContext);
  // const totalAmount = calculateTotal(cartItems);

  const location = useLocation();
  console.log("Received state:", location.state);
  const totalAmount = location.state ? location.state.totalAmount : 0;
 
  const initialFormData = {
    fullName: "",
    mobileNumber: "",
    addressLine: "",
    area: "",
    town: "",
    state: "",
    country: "",
    pincode: "",
    isDefaultAddress: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchedCountries = Country.getAllCountries();
    setCountries(fetchedCountries);
    setStates([]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);  // Add this line to check formData
      const response = await axios.post(
        `http://localhost:5555/api/${email}/address`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response from server:", response.data);
      setFormData(initialFormData);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountryCode,
      state: "",
    }));
    if (selectedCountryCode) {
      const fetchedStates = State.getStatesOfCountry(selectedCountryCode);
      setStates(fetchedStates);
    } else {
      setStates([]);
    }
  };

  const handleNext = () => {
    if (selectedAddress !== null) {
      navigate("/Payment", { state: { totalAmount: totalAmount } }); // Pass totalAmount in state
    }
  };
  
  

  return (
    <>
    <Navbar2/>
    <div className="page">
      <div className="address-view-container">
        <AddressView
          selectedAddress={selectedAddress}
          onAddressSelection={(addressId) => setSelectedAddress(addressId)}
        />
      </div>

      {showForm ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3 className="form-header">Add a new delivery address</h3>
            <div className="form-fields">
              {/* Full Name */}
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              {/* Mobile Number */}
              <div className="form-field">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                />
              </div>
              {/* Address Line */}
              <div className="form-field">
                <label>Address Line</label>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address line"
                />
              </div>
              {/* Area */}
              <div className="form-field">
                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  placeholder="Enter your area"
                />
              </div>
              {/* Town/City */}
              <div className="form-field">
                <label>Town/City</label>
                <input
                  type="text"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  required
                  placeholder="Enter your town/city"
                />
              </div>
              {/* Country */}
              <div className="form-field">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* State */}
              <div className="form-field">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Pincode */}
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  placeholder="Enter your pincode"
                />
              </div>
              {/* Default Address */}
              <div className="form-field">
                <label>
                  <input
                    type="checkbox"
                    name="isDefaultAddress"
                    checked={isDefaultAddress}
                    onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                  />{" "}
                  Make this default address
                </label>
              </div>
            </div>
            <div className="buttons-container">
             
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="cancel-button"
              >
               Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="add-address-container">
          <button
            onClick={() => setShowForm(true)}
            className="add-address-button"
          >
            Add New Delivery Address
          </button>
        </div>   
      )}

      <button
        style={{ marginBottom: "20px" }}
        onClick={handleNext}
        disabled={selectedAddress === null}
      >
        Next
      </button>
    </div>
    </>
  );
};

export default IntegratedAddressPage;
