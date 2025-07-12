import React, { useState, useEffect } from 'react';
import { API_Path } from '../../../Helper/ApiPath';

const FirmCollections = ({ onFirmClick }) => {
  const [firmData, setFirmData] = useState([]);

  const frimDataHandler = async () => {
    try {
      const response = await fetch(`${API_Path}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendor); 
      console.log("firmData:", newFirmData);
    } catch (error) {
      alert("Firm Data not Fetched");
      console.log("Firm Data not Fetched");
    }
  };

  useEffect(() => {
    frimDataHandler();
  }, []);

  return (
    <>
      <h3 className='firmController-heading'>Fuel Stations with Online Delivery</h3>
      <section className="firmsection">
        {firmData.map((fuel) => (
          <div className="firm-venderBox" key={fuel._id}>
            {fuel.firm.map((item) => (
              <div  key={item._id}  className="firm-Image"  onClick={() => onFirmClick(item._id, item.firmName)}  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <img src={`${API_Path}/uploads/${item.image}`} alt={item.firmName} />
                <div className="firmOffer">{item.offer || "No current offer"}</div>
                <div>
                  <div className="firm-Names">{item.firmName}</div>
                  <div className="area">{item.area}</div>
                  <div className="offer">{item.offer}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};

export default FirmCollections;
