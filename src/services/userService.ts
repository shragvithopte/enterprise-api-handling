import { mockUsers } from "../data/mockUsers";
import { handleApiResponse } from "../utils/apiResponse";
import { handleApiError } from "../utils/apiError";

export const getUsers = async () => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 1000);
    });

    return handleApiResponse(response);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addUser = async () => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1000);
    });

    return handleApiResponse(response);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};