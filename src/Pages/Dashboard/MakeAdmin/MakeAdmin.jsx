import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();

   //^ for pagination
   const [curetPage, setCuretPage] = useState(0);
   const [itemsParPage, setItemsParPage] = useState(10);
   const [count, setCount] = useState(0);
   const numberOfPage = Math.ceil(count / itemsParPage);
   const pages = [...Array(numberOfPage).keys()];
 
   // Fetch article count
   const { data: c = {} } = useQuery({
     queryKey: ["usersCount"],
     queryFn: async () => {
       const res = await axiosSecure.get("/users/count");
       setCount(res.data);
       return res.data;
     },
   });

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", curetPage, itemsParPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${curetPage}&size=${itemsParPage}`);
      return res.data;
    },
  });

  // Handle making a user admin
  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/admin/${userId}`);
      Swal.fire({
        title: "Success!",
        text: "User is now an Admin.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to make user admin.", `${error}`);
    }
  };

    //^ pagination

    const handlePrev = () => {
      if (curetPage > 0) {
        setCuretPage(curetPage - 1);
      }
    };
  
    const handleNext = () => {
      if (pages.length - 1 > curetPage) {
        setCuretPage(curetPage + 1);
      }
    };
  
    const handleItemPerPage = (e) => {
      const val = parseInt(e.target.value);
      setItemsParPage(val);
      setCuretPage(0);
    };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      className="btn btn-outline w-40 btn-primary"
                      onClick={() => handleMakeAdmin(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* //^ pagination */}
      <div className="flex items-center justify-center mx-auto mt-10 ">
        <button className="btn btn-primary hidden sm:block" onClick={handlePrev}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCuretPage(page)}
            className={`${
              curetPage === page ? "bg-primary text-white" : ""
            } m-2 py-1 px-2 border border-primary rounded-md`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button className="btn btn-primary hidden sm:block" onClick={handleNext}>
          Next
        </button>
        <select
          value={itemsParPage}
          onChange={handleItemPerPage}
          className="border ml-3 border-primary p-1 sm:p-2 rounded-md"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default MakeAdmin;
