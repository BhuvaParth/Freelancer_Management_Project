import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  const handleStatusToggle = (index) => {
    const updatedData = data.map((item, i) =>
      i === index
        ? {
            ...item,
            projectStatus:
              item.projectStatus === "active" ? "inactive" : "active",
          }
        : item
    );
    setData(updatedData);
    localStorage.setItem("projects", JSON.stringify(updatedData));
  };

  const truncate = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const totalEarnings = data.reduce(
    (acc, item) => acc + parseFloat(item.amount || 0),
    0
  );

  const chartData = data.reduce((acc, item) => {
    const category = item.category;
    const amount = parseFloat(item.amount) || 0;

    const Category = acc.find((entry) => entry.name === category);
    if (Category) {
      Category.amount += amount;
    } else {
      acc.push({ name: category, amount });
    }

    return acc;
  }, []);

  return (
    <div className="container mx-auto px-4">
      {data.length > 0 ? (
        <div>
          <div className="my-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Earnings: ${totalEarnings.toFixed(2)}
            </h2>
          </div>

          <div className="my-10">
            <ResponsiveContainer width="50%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h2 className="text-xl font-bold my-4 mt-10">Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-4"
              >
                <h2 className="text-xl font-bold text-black">
                  {truncate(item.title, 80)}
                </h2>
                <p className="text-base text-gray-700">
                  {truncate(item.description, 250)}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {truncate(item.category, 50)}
                </p>
                <p className="text-sm text-gray-600">
                  Submission Date: {truncate(item.submissionDate, 50)}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Method: {truncate(item.paymentMethod, 50)}
                </p>
                <p className="text-sm text-gray-600">
                  Project Status: {truncate(item.projectStatus, 50)}
                </p>
                <h4 className="text-md font-medium text-black">
                  Amount: {truncate(item.amount, 50)}
                </h4>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-rose-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleStatusToggle(index)}
                    className={`${
                      item.projectStatus === "active"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    } text-white font-medium py-2 px-4 rounded-md shadow-md hover:${
                      item.projectStatus === "active"
                        ? "bg-green-700"
                        : "bg-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  >
                    {item.projectStatus === "active" ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[600px]">
          <p className="text-2xl font-bold">No Data Found</p>
        </div>
      )}
    </div>
  );
}
