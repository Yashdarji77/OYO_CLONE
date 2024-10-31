"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Filters = ({
  price,
  setPrice,
  handlePrice,
  checkedList,
  setCheckedList,
}) => {
  const [list, setList] = useState([]);

  const fetchFacilities = async () => {
    try {
      const { data } = await axios.get(`/api/facilities`);
      if (data?.facilities) {
        setList(data.facilities);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckList = (e) => {
    let newList = [...checkedList];
    if (e.target.checked) {
      newList.push(e.target.value);
    } else {
      newList = newList.filter((i) => i !== e.target.value);
    }
    setCheckedList(newList);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg p-6 m-5 shadow-lg bg-white">
      <div className="flex items-center mb-4">
        <label htmlFor="price" className="text-xl font-semibold mr-4">
          Price:
        </label>
        <input
          type="range"
          name="price"
          id="price"
          min={1000}
          max={20000}
          onChange={(e) => setPrice(e.target.value)}
          defaultValue={price ? price : 0}
          className="flex-grow"
        />
        <span className="ml-4 text-lg font-medium text-gray-800">
          &#8377; {price || ""}
        </span>
      </div>
      <button
        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mt-4 transition duration-200"
        onClick={handlePrice}
      >
        Search
      </button>
      <div className="my-8">
        <h3 className="text-xl font-bold mb-4">Filter By Facilities:</h3>
        <div className="grid grid-cols-2 gap-2">
          {list?.map((facility) => (
            <div key={facility} className="flex items-center">
              <input
                type="checkbox"
                name="checkbox"
                id={facility}
                value={facility}
                onChange={handleCheckList}
                className="w-5 h-5 text-green-500 focus:ring-green-600 cursor-pointer"
              />
              <label htmlFor={facility} className="ml-3 text-gray-700 text-lg">
                {facility}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
