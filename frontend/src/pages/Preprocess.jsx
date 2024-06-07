import React, {useEffect, useState} from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Preprocess = () => {
  const { authToken, authRole } = useStateContext();

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
        <p className="text-2xl pb-2">Pre-process Students For Form Fill Up</p>
      </div>
      <div>
        <div>

        </div>
        {
          
        }
      </div>
    </div>
  );
};

export default Preprocess;
