import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for dynamic routing.

const ProjectList = ({ organizations }) => {
  return (
    <div className="overflow-x-auto max-h-80">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Project Name</th>
            <th className="border border-gray-300 p-2">Organization Name</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => 
            org.projects.map((project) => (
              <tr key={project.id}>
                <td className="border border-gray-300 p-2 text-blue-500 hover:underline">
                  <Link to={`/organization/${org.id}/${project.id}`}>
                    {project.project_name}
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">{org.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
