import React, { useState } from "react";

export default function PaymentData() {
  const [storedProjects, setStoredProjects] = useState(
    JSON.parse(localStorage.getItem("projects") || "[]")
  );

  const toggleStatus = (index) => {
    const updatedProjects = [...storedProjects];
    updatedProjects[index].projectStatus =
      updatedProjects[index].projectStatus === "Paid" ? "Unpaid" : "Paid";
    setStoredProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="container mx-auto px-4">
      {storedProjects.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">All Payment Data</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Submission Date</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Project Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {storedProjects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{project.title}</td>
                  <td className="py-2 px-4 border-b">{project.submissionDate}</td>
                  <td className="py-2 px-4 border-b">${project.amount}</td>
                  <td className="py-2 px-4 border-b">{project.projectStatus}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => toggleStatus(index)}
                      className={`py-1 px-3 rounded-md ${
                        project.projectStatus === "Paid"
                          ? " bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {project.projectStatus === "Paid" ? "Unpaid" : "Paid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[600px]">
          <p className="text-2xl font-bold">No Payment Data Found</p>
        </div>
      )}
    </div>
  );
}
