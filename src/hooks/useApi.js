import { useEffect, useState } from "react";

export const useApi = (endpoint, meth = "GET", body = null) => {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
          method: meth,
          headers: {
            "Content-Type": "application/json"
          },
          body: body ? JSON.stringify(body) : null
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (e) {
        setData(e);
      }
    };

    fetchData();
  }, [endpoint, meth, body]);

  return { data };
};