import axios from "axios";
import { UserWorker } from "../types";

export const fetchWorkers = async () => {
  try {
    const response = await axios.get<UserWorker[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    const resData = await response.data;

    if (!resData) {
      throw new Error("Failed to fetch workers");
    }

    return resData;
  } catch (error) {
    console.error("Failed to fetch workers:", error);
  }
};
