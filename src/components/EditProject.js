import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("projects")) || [];
    const project = storedData[id];
    if (project) {
      setFormData(project);
    }
  }, [id]);

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    setErrors(validationErrors); 
    return Object.keys(validationErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()) {
      const storedData = JSON.parse(localStorage.getItem("projects")) || [];
      storedData[id] = formData; 
      localStorage.setItem("projects", JSON.stringify(storedData)); 
      navigate("/");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
}
