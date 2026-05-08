// services/taskService.js

import { BASE_URL } from "../config/api";

const API_URL = `${BASE_URL}/tasks`;

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
    throw new Error(data?.message || data?.error || "Something went wrong");
  }

  return data;
};

/**
 * Get all tasks
 */
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);

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
    const response = await fetch(`${API_URL}/${id}`);

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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Update Task Error:", error);
    throw error;
  }
};

/**
 * Delete task
 */
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Delete Task Error:", error);
    throw error;
  }
};
