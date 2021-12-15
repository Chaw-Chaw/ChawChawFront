import axios, { AxiosError } from "axios";
import { LOGIN_PAGE_URL } from "../../constants/pageUrls";
import { DefaultResponseBody } from "../../../types/response";

import {
  ERROR_CODES,
  EXCEPT_ERRORCODES_MSG,
  EXCEPT_ERROR_MSG,
} from "../../constants";
import { request } from "../../utils/request";

interface ErrorHandlingProps<T> {
  err: AxiosError<DefaultResponseBody<T>>;
}
export const useApi = () => {
  const errorHandling = <T>({ err }: ErrorHandlingProps<T>) => {
    console.log(err.response, "errorHandling");
    if (!err.response) throw err;
    const { status } = err.response.data;

    if (!ERROR_CODES[status]) {
      // message.error(EXCEPT_ERRORCODES_MSG);
      return;
    }

    if (status === "C401") {
      return;
    }

    if (status === "U402") {
      return;
    }
    if (status === "T401" || status === "G403") {
      // message.error(ERROR_CODES[status].message, {
      //   onClose: () => {
      //     window.localStorage.removeItem("accessToken");
      //     window.localStorage.removeItem("expireAtAccessToken");
      //     window.localStorage.removeItem("user");
      //     window.location.href = LOGIN_PAGE_URL;
      //   },
      // });
    } else {
      // message.error(`${ERROR_CODES[status].message}`);
    }
  };

  const catchError = (err: AxiosError<DefaultResponseBody<any>>) => {
    if (axios.isAxiosError(err)) {
      errorHandling({ err });
    } else {
      // message.error(EXCEPT_ERROR_MSG);
      console.error(err);
    }
  };

  const sendPost = async <T>(url: string, body: Object) => {
    try {
      const result = await request.post<DefaultResponseBody<T>>(url, body);
      console.log(result);
      return result.data;
    } catch (err) {
      catchError(err);
      throw err;
    }
  };

  const sendGet = async <T>(url: string, params?: Object) => {
    try {
      const result = await request.get<DefaultResponseBody<T>>(url, {
        params: params,
      });
      console.log(result);
      return result.data;
    } catch (err) {
      catchError(err);
      throw err;
    }
  };

  const sendDelete = async <T>(url: string, body?: Object) => {
    try {
      const result = await request.delete<DefaultResponseBody<T>>(url, {
        data: body,
      });
      console.log(result);
      return result.data;
    } catch (err) {
      catchError(err);
      throw err;
    }
  };

  const sendFormData = async <T>(url: string, formData: FormData) => {
    try {
      const result = await request.post<DefaultResponseBody<T>>(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);
      return result.data;
    } catch (err) {
      catchError(err);
      throw err;
    }
  };
  return { sendDelete, sendGet, sendPost, sendFormData, errorHandling };
};
