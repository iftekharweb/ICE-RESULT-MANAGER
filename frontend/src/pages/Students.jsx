import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import {SearchIt} from '../components'

const x = [
  {
    id: 1,
    name: "Gaye De Souza",
    email: "gde0@who.int",
    session: "Estimator",
  },
  {
    id: 2,
    name: "Drona Fraulo",
    email: "dfraulo1@scientificamerican.com",
    session: "Construction Foreman",
  },
  {
    id: 3,
    name: "Carol-jean Deinert",
    email: "cdeinert2@flickr.com",
    session: "Project Manager",
  },
  {
    id: 4,
    name: "Amitie Beare",
    email: "abeare3@nationalgeographic.com",
    session: "Architect",
  },
  {
    id: 5,
    name: "Cyb Lascelles",
    email: "clascelles4@pinterest.com",
    session: "Construction Manager",
  },
  {
    id: 6,
    name: "Fredericka Villaron",
    email: "fvillaron5@discovery.com",
    session: "Construction Worker",
  },
  {
    id: 7,
    name: "Mora Aspling",
    email: "maspling6@e-recht24.de",
    session: "Project Manager",
  },
  {
    id: 8,
    name: "Dean Leidecker",
    email: "dleidecker7@cpanel.net",
    session: "Estimator",
  },
  {
    id: 9,
    name: "Burg Giordano",
    email: "bgiordano8@foxnews.com",
    session: "Construction Foreman",
  },
  {
    id: 10,
    name: "Hanson Cordle",
    email: "hcordle9@hao123.com",
    session: "Construction Worker",
  },
  {
    id: 11,
    name: "Joey Treadgear",
    email: "jtreadgeara@cornell.edu",
    session: "Electrician",
  },
  {
    id: 12,
    name: "Jo Roskams",
    email: "jroskamsb@google.es",
    session: "Construction Worker",
  },
  {
    id: 13,
    name: "Celestine Turner",
    email: "cturnerc@youku.com",
    session: "Architect",
  },
  {
    id: 14,
    name: "Lorene Getch",
    email: "lgetchd@sakura.ne.jp",
    session: "Construction Foreman",
  },
  {
    id: 15,
    name: "Murial Ashenhurst",
    email: "mashenhurste@ucoz.com",
    session: "Construction Worker",
  },
  {
    id: 16,
    name: "Horst Tritton",
    email: "htrittonf@slideshare.net",
    session: "Construction Foreman",
  },
  {
    id: 17,
    name: "Spencer Reburn",
    email: "sreburng@reference.com",
    session: "Project Manager",
  },
  {
    id: 18,
    name: "Maggie Kerrane",
    email: "mkerraneh@fda.gov",
    session: "Electrician",
  },
  {
    id: 19,
    name: "Gail De Michetti",
    email: "gdei@jugem.jp",
    session: "Subcontractor",
  },
  {
    id: 20,
    name: "Rowen Dulinty",
    email: "rdulintyj@pbs.org",
    session: "Project Manager",
  },
  {
    id: 21,
    name: "Shea Bengefield",
    email: "sbengefieldk@desdev.cn",
    session: "Construction Expeditor",
  },
  {
    id: 22,
    name: "Adams Harrold",
    email: "aharroldl@pbs.org",
    session: "Estimator",
  },
  {
    id: 23,
    name: "Debor Prettyman",
    email: "dprettymanm@webnode.com",
    session: "Construction Manager",
  },
  {
    id: 24,
    name: "Danita Zanettini",
    email: "dzanettinin@dagondesign.com",
    session: "Construction Worker",
  },
  {
    id: 25,
    name: "Zonnya Sobieski",
    email: "zsobieskio@tumblr.com",
    session: "Architect",
  },
  {
    id: 26,
    name: "Agna Taveriner",
    email: "ataverinerp@tamu.edu",
    session: "Engineer",
  },
  {
    id: 27,
    name: "Mathe Lidgley",
    email: "mlidgleyq@yale.edu",
    session: "Project Manager",
  },
  {
    id: 28,
    name: "Roxanna Kneafsey",
    email: "rkneafseyr@1688.com",
    session: "Construction Expeditor",
  },
  {
    id: 29,
    name: "Gustavo Olivetti",
    email: "golivettis@slideshare.net",
    session: "Construction Worker",
  },
  {
    id: 30,
    name: "Deni Boik",
    email: "dboikt@google.cn",
    session: "Supervisor",
  },
  {
    id: 31,
    name: "Lotta Potebury",
    email: "lpoteburyu@tinypic.com",
    session: "Estimator",
  },
  {
    id: 32,
    name: "Merrel Loughnan",
    email: "mloughnanv@imdb.com",
    session: "Engineer",
  },
  {
    id: 33,
    name: "Claudianus Jewitt",
    email: "cjewittw@newyorker.com",
    session: "Project Manager",
  },
  {
    id: 34,
    name: "Terrie Ellerker",
    email: "tellerkerx@mozilla.org",
    session: "Estimator",
  },
  {
    id: 35,
    name: "Noreen Lanchbury",
    email: "nlanchburyy@lulu.com",
    session: "Project Manager",
  },
  {
    id: 36,
    name: "Lory Gerlack",
    email: "lgerlackz@netscape.com",
    session: "Surveyor",
  },
  {
    id: 37,
    name: "Jacky Limpricht",
    email: "jlimpricht10@webmd.com",
    session: "Construction Foreman",
  },
  {
    id: 38,
    name: "Milena Quade",
    email: "mquade11@163.com",
    session: "Engineer",
  },
  {
    id: 39,
    name: "Glyn Trainor",
    email: "gtrainor12@g.co",
    session: "Project Manager",
  },
  {
    id: 40,
    name: "Lutero Fogel",
    email: "lfogel13@scribd.com",
    session: "Construction Foreman",
  },
  {
    id: 41,
    name: "Davina Leither",
    email: "dleither14@cyberchimps.com",
    session: "Construction Worker",
  },
  {
    id: 42,
    name: "Wenona Ropkins",
    email: "wropkins15@uiuc.edu",
    session: "Electrician",
  },
  {
    id: 43,
    name: "Stan Kensit",
    email: "skensit16@ucoz.com",
    session: "Surveyor",
  },
  {
    id: 44,
    name: "Silvia Coomer",
    email: "scoomer17@reverbnation.com",
    session: "Architect",
  },
  {
    id: 45,
    name: "Even Staner",
    email: "estaner18@google.com.hk",
    session: "Surveyor",
  },
  {
    id: 46,
    name: "Isabelle Ducket",
    email: "iducket19@fc2.com",
    session: "Construction Worker",
  },
  {
    id: 47,
    name: "Lenci Deary",
    email: "ldeary1a@exblog.jp",
    session: "Construction Worker",
  },
  {
    id: 48,
    name: "Gilberta Grayshan",
    email: "ggrayshan1b@craigslist.org",
    session: "Supervisor",
  },
  {
    id: 49,
    name: "Lena Treadger",
    email: "ltreadger1c@wikipedia.org",
    session: "Construction Manager",
  },
  {
    id: 50,
    name: "Larry Rockall",
    email: "lrockall1d@livejournal.com",
    session: "Construction Manager",
  },
  {
    id: 51,
    name: "Carleen Lukesch",
    email: "clukesch1e@gravatar.com",
    session: "Construction Worker",
  },
  {
    id: 52,
    name: "Binky Glide",
    email: "bglide1f@virginia.edu",
    session: "Engineer",
  },
  {
    id: 53,
    name: "Inge Tongue",
    email: "itongue1g@feedburner.com",
    session: "Construction Foreman",
  },
  {
    id: 54,
    name: "Noellyn Moreinis",
    email: "nmoreinis1h@paginegialle.it",
    session: "Subcontractor",
  },
  {
    id: 55,
    name: "Linnell Dales",
    email: "ldales1i@arstechnica.com",
    session: "Project Manager",
  },
];

const Students = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/students`);
      setStudents(response.data);
    } catch (error) {
      setStudents(x);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const currentStudents = students.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );
  console.log(currentStudents);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl">
      <div className="flex flex-row justify-between">
        {/* Header */}
        <div className="pb-3">
          <p className="text-3xl font-semibold">All Students</p>
        </div>
        <div className=" flex justify-center items-center pb-3">
        <div className="mr-1"><SearchIt/></div>
          <div>

            <button className="flex justify-center items-center rounded bg-[#03C9D7] px-5 py-1 text-md font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#03C9D7]">
              <span className="font-bold pr-2">
                <IoMdAdd />
              </span>
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Student ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Session
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {student.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.session}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.email}
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
                      ? "block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
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
    </div>
  );
};

export default Students;
