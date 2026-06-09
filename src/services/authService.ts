import { handleApiError } from "../utils/apiError";
import { handleApiResponse } from "../utils/apiResponse";

export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          email === "admin@test.com" &&
          password === "admin123"
        ) {
          localStorage.setItem(
            "authToken",
            "mock-jwt-token"
          );

          resolve({
            name: "Admin User",
            email,
          });
        } else {
          reject(
            new Error("Invalid Credentials")
          );
        }
      }, 1000);
    });

    return handleApiResponse(response);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};