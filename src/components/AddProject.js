import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const projectData = {
        title,
        description,
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
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Add Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter a title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
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
