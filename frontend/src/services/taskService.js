import { BASE_URL } from "../config/api";
import handleResponse from "./handleResponse";

const API_URL = `${BASE_URL}/tasks`;

/**
 * Get token from sessionStorage
 */
const getToken = () => {
  return sessionStorage.getItem("user_token");
};

/**
 * Common auth headers
 */
const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

/**
 * Get all tasks
 */
export const getTasks = async (
  page = 1,
  limit = 10,
  search = "",
  status = "All",
) => {
  try {
    // Construct query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search,
      status: status,
    });

    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    throw error;
  }
};
/**
 * Get dashboard data
 */

export const getDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard`, {
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    throw error;
  }
};

/**
 * Get task by ID
 */
export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Get Task Error:", error);
    throw error;
  }
};

/**
 * Create task
 */
export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Create Task Error:", error);
    throw error;
  }
};

/**
 * Update task
 */
export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Update Task Error:", error);
    throw error;
  }
};

/**
 * Delete task (soft delete on backend)
 */
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Delete Task Error:", error);
    throw error;
  }
};
