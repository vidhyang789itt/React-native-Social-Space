import { BASE_URL } from "../constants/ApiRoutes";

export const getMediaUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `${BASE_URL}/${url}`;
};