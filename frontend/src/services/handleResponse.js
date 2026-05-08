import toast from "react-hot-toast";

/**
 * Common API response handler
 */
const handleResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    toast.error(data?.message || data?.error || "Something went wrong");
  }

  return data;
};

export default handleResponse;
