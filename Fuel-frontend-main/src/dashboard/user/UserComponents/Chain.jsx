import React, { useState, useEffect } from 'react';
import { API_Path } from '../../../Helper/ApiPath';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EastIcon from '@mui/icons-material/East';

const Chain = ({ onFirmClick }) => {
  const [venderData, setVenderData] = useState([]);
  const [scrollPosition , setScrollPosition] = useState(0);

  const venderFirmHandler = async () => {
    try {
      const response = await fetch(`${API_Path}/vendor/all-vendors`);
      const NewData = await response.json();
      setVenderData(NewData);
      console.log("This is API data: ", NewData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    venderFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById('ChainGallery');
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth"
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div className="btnsection">
        <button onClick={() => handleScroll("left")}><ArrowBackIcon /></button>
        <button onClick={() => handleScroll("right")}><EastIcon /></button>
      </div>
      <h2 className='chain-heading'>Top Fuel Stations in Hyderabad</h2>
      <div className='ChainSection' id='ChainGallery' onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
        {venderData.vendor && venderData.vendor.map((vender) => (
          <div className='venderBox' key={vender._id}>
            {vender.firm.map((item) => (
              <div
                key={item._id}
                className='firmImage'
                style={{ cursor: 'pointer' }}
                onClick={() => onFirmClick(item._id, item.firmName)}
              >
                <img src={`${API_Path}/uploads/${item.image}`} alt={item.firmName} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chain;
