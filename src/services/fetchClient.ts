import { getToken } from "../utils/AsyncStorage";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  isFormData?: boolean;
}

export const fetchClient = async <T>(
  Url: string,
  options: FetchOptions,
): Promise<T> => {

  const token = await getToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (options.requireAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!options.isFormData) {
    headers["Content-Type"] = "application/json";
  }
  
  try {

    console.log("Calling API:", Url);

    const response = await fetch(Url, {
      ...options,
      headers,
    });


    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message || "Request Failed");
    }

    return data;

  } catch (err: any) {

    console.log("FETCH ERROR:", err);

    throw new Error(err.message || "Something went wrong");
  }
};