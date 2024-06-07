import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStateContext } from "../contexts/ContextProvider";

const DateTimeDisplay = ({ dateTimeString }) => {
  const dateObj = new Date(dateTimeString);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return (
    <span>
      {date} {time}
    </span>
  );
};

const FormFillUp = () => {
  const { authToken, authRole } = useStateContext();

  const [id, setId] = useState(null);
  const [semester, setSemester] = useState(null);
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [description, setDescription] = useState("");
  const [is_expired, setIs_expired] = useState(undefined);

  const [notices, setNotices] = useState([]);

  const fetchForms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/form-fill-ups/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        const data = res.data;
        setNotices(data);
      } else {
        console.log("Something is wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl h-[90%]">
      <div>
        {notices.map(
          (notice) =>
            !notice.is_expired && (
              <>
                <article
                  className="rounded-xl bg-white p-4 ring ring-[#03C9D7] sm:p-6 lg:p-8 my-5"
                  key={notice.id}
                >
                  <div className="flex items-start sm:gap-8">
                    <div
                      className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-[#03C9D7]"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-1">
                        <span className="h-8 w-0.5 rounded-full bg-[#03C9D7]"></span>
                        <span className="h-6 w-0.5 rounded-full bg-[#03C9D7]"></span>
                        <span className="h-4 w-0.5 rounded-full bg-[#03C9D7]"></span>
                        <span className="h-6 w-0.5 rounded-full bg-[#03C9D7]"></span>
                        <span className="h-8 w-0.5 rounded-full bg-[#03C9D7]"></span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-start">
                        <strong className="rounded border border-[#03C9D7] bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium text-white mr-2">
                          Notice ID #{notice.id}
                        </strong>
                        <div>
                        { authRole === "Student" && <button className="rounded border border-[#03C9D7]  hover:bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium hover:text-white mr-2">
                          Form Fill Up
                        </button>}
                        {authRole === "Teacher" && <button className="rounded border border-[#03C9D7]  hover:bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium hover:text-white mr-2">
                          Add Attendence 
                        </button>}
                        </div>
                      </div>

                      <h3 className="mt-4 text-lg font-medium sm:text-xl">
                        <p> {notice.title} </p>
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        {notice.description}
                      </p>

                      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>

                          <p className="text-xs font-medium">
                            Starts at{" "}
                            <DateTimeDisplay
                              dateTimeString={notice.start_time}
                            />
                          </p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                          &middot;
                        </span>

                        <div className="flex items-center gap-1 text-gray-500">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>

                          <p className="text-xs font-medium">
                            Ends at{" "}
                            <DateTimeDisplay dateTimeString={notice.end_time} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </>
            )
        )}
      </div>
    </div>
  );
};

export default FormFillUp;
