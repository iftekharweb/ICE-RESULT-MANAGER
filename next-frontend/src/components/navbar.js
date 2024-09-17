"use client";

import { useStateContext } from "@/contexts";
import { FiLogOut } from "react-icons/fi";
import BookGIF from "@/public/book.gif";
import Image from "next/image";
import * as actions from "@/actions";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { authEmail, authName, authToken, handleLogOut, authRole } =
    useStateContext();
  const [userMenu, setUserMenu] = useState(false);
  const handleLogoutClick = () => {
    handleLogOut();
  };
  useEffect(() => {
    if (!authEmail) actions.To_login_page();
  }, [authEmail]);
  return (
    <>
      {authEmail && (
        <header className="bg-white shadow-md">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <button
              className="block text-teal-600"
              onClick={() => actions.To_home_page()}
            >
              <span className="sr-only">Home</span>
              <Image src={BookGIF} width={40} height={50} />
            </button>

            <div className="flex flex-1 items-center justify-end md:justify-between">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="relative">
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => setUserMenu(!userMenu)}
                    >
                      {" "}
                      Users{" "}
                    </button>
                    {userMenu && (
                      <div
                        className="absolute end-0 z-10 mt-2 w-auto rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setUserMenu(!userMenu);
                              actions.To_students_page();
                            }}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                            role="menuitem"
                          >
                            Students
                          </button>

                          <button
                            onClick={() => {
                              setUserMenu(!userMenu);
                              actions.To_teachers_page();
                            }}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                            role="menuitem"
                          >
                            Teachers
                          </button>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => actions.To_courses_page()}
                    >
                      {" "}
                      Courses{" "}
                    </button>
                  </li>

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => actions.To_form_fillup_page()}
                    >
                      {" "}
                      FormFillup{" "}
                    </button>
                  </li>

                  {authRole === "Teacher" && (
                    <li>
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => actions.To_marking_page()}
                      >
                        {" "}
                        Marking{" "}
                      </button>
                    </li>
                  )}

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => actions.To_result_page()}
                    >
                      {" "}
                      Result{" "}
                    </button>
                  </li>

                  {authRole === "Admin" && (
                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="http://127.0.0.1:8000/admin/"
                      >
                        {" "}
                        Admin{" "}
                      </a>
                    </li>
                  )}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                  <button
                    className="hover:bg-sky-500 text-gray-400 hover:text-white  px-2 rounded-md"
                    onClick={() => actions.To_profile_page()}
                  >
                    <span className="text-14">Hi,</span>{" "}
                    <span className="font-bold ml-1 text-14">{authName}</span>
                  </button>
                  <button className="px-4" onClick={handleLogoutClick}>
                    <FiLogOut className="font-semibold text-gray-500 hover:text-red-500 hover:font-bold text-xl" />
                  </button>
                </div>

                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
