import React, { useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { FaCircleArrowRight } from "react-icons/fa6";
import CreateTeacherModal from "./CreateTeacherModal";

const CreateStudentModal = ({ handleAdd }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [addStudent, setAddStudent] = useState(false);
  const [addTeacher, setAddTeacher] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddTeacher(!addTeacher);
    return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/register/`,
        { name, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        setUser(res.data.id);
      } else {
        console.log("Error Man!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!addStudent && !addTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
            <div>
              <div className="flex justify-between items-center pb-3">
                <div className="py-2">
                  <p className="text-2xl font-semibold">Create User</p>
                </div>
                <div className="py-2">
                  <button onClick={handleAdd}>
                    <MdOutlineCancel className="text-2xl hover:text-red-500" />
                  </button>
                </div>
              </div>
              <div>
                <form action="#" onSubmit={handleSubmit}>
                  <label
                    htmlFor="Full Name"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
                  >
                    <input
                      type="text"
                      id="full name"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Full Name"
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Full Name
                    </span>
                  </label>
                  <label
                    htmlFor="Full Name"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
                  >
                    <input
                      type="email"
                      id="email"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Email"
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Email
                    </span>
                  </label>
                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2"
                  >
                    <option value="">Select Role</option>
                    <option value="System Admin">System Admin</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                  <label
                    htmlFor="Full Name"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
                  >
                    <input
                      type="password"
                      id="password"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Password"
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Password
                    </span>
                  </label>
                  <div className="w-full flex justify-center items-center">
                    <button
                      className="text-md font-semibold text-gray-500 hover:text-[#03C9D7] flex justify-center items-center"
                      type="submit"
                    >
                      {" "}
                      <span className="mr-1">
                        Next
                      </span> <FaCircleArrowRight />{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {addStudent && <CreateStudentModal handleAdd={handleAdd} />}
      {addTeacher && <CreateTeacherModal handleAdd={handleAdd} user={user}/>}
    </>
  );
};

export default CreateStudentModal;
