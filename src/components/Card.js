import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("cardData");

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
              <img
                className="max-w-[200px] object-cover mr-4"
                src={item.image}
                alt={`Image for ${item.title}`}
              />
              <div className="p-4 w-full">
                <h2 className="text-2xl font-bold text-black">
                  {truncate(item.title, 80)}
                </h2>
                <p className="text-lg text-black">
                  {truncate(item.description, 250)}
                </p>
                <Link
                  to="/about"
                  state={{ item }}
                  className="text-xl text-violet-600 hover:underline mt-2 inline-block"
                >
                  Learn More
                </Link>
              </div>
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
