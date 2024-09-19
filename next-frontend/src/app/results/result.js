"use client";

import { useState, useEffect, act } from "react";
import * as actions from "@/actions";

const Result = () => {
  const [allSemesters, setAllSemesters] = useState([]);
  const [semester, setSemester] = useState(null);
  const [id, setId] = useState(null);
  const [results, setResults] = useState({ results: [] });
  const [msg, setMsg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

  const totalPages = Math.ceil(results?.results.length / resultsPerPage);
  const currentResults = results?.results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchSemesters = async () => {
    const res = await actions.fetch_semesters();
    if (!res.error) {
      setAllSemesters(res.semesters);
    }
  };
  useEffect(() => {
    fetchSemesters();
    setMsg("");
    setResults({ results: [] });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await actions.get_student_result(id, semester);
    if(!res.error) {
      setResults(res.result);
      setMsg("");
    } else {
      setMsg(res.msg);
      setResults({ results: [] });
    }
  };

  return (
    <div className="m-2 p-2 md:px-10 bg-white rounded-3xl h-[90%]">
      <div className="flex justify-between items-center w-full py-1">
        <div className="w-[45%]">
          <p className="font-semibold text-3xl">Results of Students</p>
        </div>
        <div className="w-[55%]">
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex justify-end items-center w-full "
          >
            <div className="w-[40%] mx-2">
              <label
                htmlFor="Student ID"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500"
              >
                <input
                  type="number"
                  id="Student ID"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Student ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Student ID
                </span>
              </label>
            </div>
            <div className="w-[40%] mx-2">
              <select
                name="semester"
                id="semester"
                className=" w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-3 px-2 outline-none"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value={null}>Select Semester</option>
                <option value={0}>All semesters</option>
                {allSemesters.map((sem) => (
                  <option value={sem.id} key={sem.id}>
                    Year-{sem.year} {sem.name} Semester
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[20%]">
              <button
                className="flex justify-center items-center rounded bg-sky-500 px-5 py-3 text-md font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring active:bg-sky-500"
                onClick={handleSubmit}
              >
                <span>Get result</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {(results?.GPA || results?.CGPA) && (
        <div className="w-full flex justify-center items-center py-5 font-semibold text-lg">
          {semester != 0 ? (
            <p>Semester GPA : {results.GPA}</p>
          ) : (
            <p>CGPA : {results.CGPA}</p>
          )}
        </div>
      )}
      <div className="w-full h-full">
        {!(results?.GPA || results?.CGPA) && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-2xl">⚠</p>
            <p>
              {msg
                ? msg
                : "Fill the fields with student id and semster to get results."}
            </p>
          </div>
        )}
        {(results?.GPA || results?.CGPA) && (
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Course Code
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Title
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Credits
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      GPA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentResults.map((result) => (
                    <tr key={result.course_code}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {result.course_code}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {result.course_title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {result.total_credits}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {result.gpa_points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <ol className="flex justify-end gap-1 text-xs font-medium">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                  >
                    <span className="sr-only">Prev Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`block rounded border ${
                        currentPage === index + 1
                          ? "block size-8 rounded border-sky-500 bg-sky-500 text-center leading-8 text-white"
                          : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                      } text-center leading-8`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
