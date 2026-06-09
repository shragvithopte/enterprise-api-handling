export const handleApiError = (
  error: unknown
): string => {
  console.error("API Error:", error);

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};