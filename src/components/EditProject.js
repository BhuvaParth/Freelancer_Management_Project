import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    description: "",
    amount: "",
    submissionDate: "",
    category: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("projects");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData[index]) {
        setProject(parsedData[index]);
      }
    }
  }, [index]);

  const validate = () => {
    const newErrors = {};
    if (!project.title) newErrors.title = "Project name is required.";
    if (!project.description)
      newErrors.description = "Description is required.";
    if (!project.amount) newErrors.amount = "Amount is required.";
    if (!project.submissionDate)
      newErrors.submissionDate = "Submission date is required.";
    if (!project.category) newErrors.category = "Category is required.";
    if (!project.paymentMethod)
      newErrors.paymentMethod = "Payment method is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProject((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const storedData = JSON.parse(localStorage.getItem("projects")) || [];
      storedData[index] = project; 
      localStorage.setItem("projects", JSON.stringify(storedData));
      navigate("/"); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen my-10">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Edit Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Project Name
            </label>
            <input
              type="text"
              id="title"
              value={project.title}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter project name"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              value={project.description}
              onChange={handleChange}
              rows="4"
              className={`mt-1 block w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter a description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-white"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={project.amount}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="submissionDate"
              className="block text-sm font-medium text-white"
            >
              Submission Date
            </label>
            <input
              type="date"
              id="submissionDate"
              value={project.submissionDate}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.submissionDate ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.submissionDate && (
              <p className="text-red-500">{errors.submissionDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={project.category}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter category"
            />
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-white"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={project.paymentMethod}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.paymentMethod ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
              <option value="upi">UPI</option>
              <option value="debit_card">Debit Card</option>
              <option value="credit_card">Credit Card</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500">{errors.paymentMethod}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}


