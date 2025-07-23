import React from 'react';
import { FaUserShield } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';
import { NavLink } from 'react-router';

const AdminAccessPages = () => {
    return (
        <>
            {/* Make Admin */}
            <li className="bg-gray-300 mb-5 font-bold flex gap-2 rounded">
              <NavLink
                to="/dashboard/make-admin"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 bg-primary p-2 rounded text-white"
                    : "flex items-center gap-2 p-2"
                }
              >
                <FaUserShield className="text-lg" />
                All Users
              </NavLink>
            </li>
  
            {/* add publisher */}
            <li className="bg-gray-300 mb-5 font-bold flex gap-2 rounded">
              <NavLink
                to="/dashboard/add-publisher"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 bg-primary text-white p-2 rounded"
                    : "flex items-center gap-2 p-2"
                }
              >
                <IoIosAddCircle className="text-lg"/>
                Add Publisher
              </NavLink>
            </li>

            {/* All articles */}
            <li className="bg-gray-300 mb-5 font-bold flex gap-2 rounded">
              <NavLink
                to="/dashboard/all-articles"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 bg-primary text-white p-2 rounded"
                    : "flex items-center gap-2 p-2"
                }
              >
                <MdArticle className="text-lg"/>
                All Articles
              </NavLink>
            </li>
          </>
    );
};

export default AdminAccessPages;