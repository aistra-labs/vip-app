import { useState } from "react";

const usePostApi = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (rawData) => {
    try {
      setIsLoading(true);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawData),
      };

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (res.status === 200) {
        console.log("Api response data", data);
        setResponse(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, response, error, isLoading };
};

export default usePostApi;
