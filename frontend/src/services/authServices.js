// services/taskService.js

import toast from "react-hot-toast";
import { BASE_URL } from "../config/api";
import handleResponse from "./handleResponse";

/**
 * Create task
 */
export const loginUser = async (task) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
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
 * user register
 */
export const registerUser = async (task) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
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
