import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedData = localStorage.getItem("projects");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setData(parsedData);
        } else {
          console.error("Data in localStorage is not an array:", parsedData);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    } else {
      console.log("No data found in localStorage.");
    }
  }, []);

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("projects", JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    navigate(`/editproject/${index}`);
  };

  const truncate = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="w-full bg-transparent border-b border-gray-300 mt-4 p-4"
          >
            <div className="flex">
              <div className="p-4 w-full">
                <h2 className="text-2xl font-bold text-black">
                  {truncate(item.title, 80)}
                </h2>
                <p className="text-lg text-black">
                  {truncate(item.description, 250)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 ml-3">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-700 text-white font-medium py-[6px] px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)} 
                className="bg-rose-600 text-white font-medium py-[6px] px-4 rounded-md shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[600px]">
          <p className="text-2xl font-bold">No Data Found</p>
        </div>
      )}
    </>
  );
}
