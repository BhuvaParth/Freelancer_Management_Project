import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Project Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!submissionDate)
      newErrors.submissionDate = "Submission Date is required";
    if (!category) newErrors.category = "Category is required";
    if (!paymentMethod) newErrors.paymentMethod = "Payment Method is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const projectData = {
        title,
        description,
        amount,
        submissionDate,
        category,
        paymentMethod,
        paymentStatus: "unpaid",
      };

      const existingProjects =
        JSON.parse(localStorage.getItem("projects")) || [];

      existingProjects.push(projectData);
      localStorage.setItem("projects", JSON.stringify(existingProjects));

      navigate("/");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen my-10">
        <div className="bg-slate-800	 p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Add Project
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter project name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className={`mt-1 block w-full border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter a description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
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
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.submissionDate ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.submissionDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.submissionDate}
                </p>
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
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
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
