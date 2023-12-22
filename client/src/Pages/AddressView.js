import React, { useState, useEffect } from 'react';
import AddAddressPage from './AddAddressPage';
import axios from 'axios';

const AddressView = ({ onAddressSelection }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [token,] = useState(localStorage.getItem('token'));

// useEffect(() => {
//   fetch("http://localhost:5555/api/addresses")
//     .then(res => res.json())
//     .then(
//       (data) => {
//         setIsLoaded(true);
//         setData(data);
//       },
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     );
// }, []);

useEffect(() => {
  axios
    .get('http://localhost:5555/api/profile', {
      headers: {
        'x-token': token,
      },
    })
    .then((res) => {
      console.log(res.data);
      setIsLoaded(true);
      setData(res.data.user);
      
    })
    .catch((err) => console.log(err));
}, [token]);







  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
    onAddressSelection(addressId);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
     <div>
     
       <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', gap: '20px', position: 'relative', left: '400px', top: '25px' }}>
            {/* <button onClick={handleShowPopup}>Add Address</button> */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h3 style={{ marginBottom: '10px',marginTop:'7%' }}>Addresses</h3>
            {data.address && data.address.map((user) => (
              <div
                key={user.id}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  borderRadius: '10px',
                  border: '1px solid black',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  
                }}
              >
                <input
                  type="radio"
                  name="address"
                  value={user.id}
                  checked={selectedAddress === user.id}
                  onChange={() => handleAddressSelection(user.id)}
                />
                <span style={{ marginBottom: '10px', display: 'block', fontWeight: 'bold' }}>
                  {user.fullName}
                </span>
                <div style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
                  {`${user.mobileNumber}, ${user.addressLine}, ${user.area}, ${user.town}, ${user.state}, ${user.country}, ${user.pincode}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPopup && (
          <div className="container">
            <AddAddressPage onClose={handleHidePopup} />
          </div>
        )}
      </div>
     </div>
    );
  }
};

export default AddressView;

