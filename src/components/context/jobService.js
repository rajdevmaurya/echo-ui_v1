import API from '../utils/api';
import M from 'materialize-css';

export const fetchJobs = async (url) => {
  try {
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    M.toast({ html: error.message, classes: "rounded" });
    return null;
  }
};

export const searchJobs = async (text, page = 0, size = 10) => {
  try {
    const response = await API.put(
      `jobs/search?page=${page}&size=${size}`,
      { text },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    M.toast({ html: error.message, classes: "rounded" });
    return null;
  }
};

export const deleteJob = async (id) => {
  try {
    await API.delete(`jobs/${id}`);
    M.toast({ html: "Job deleted successfully", classes: "rounded" });
    return true;
  } catch (error) {
    console.error(error);
    M.toast({ html: error.message, classes: "rounded" });
    return false;
  }
};
