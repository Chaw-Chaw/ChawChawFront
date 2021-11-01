import { AxiosError } from "axios";
import { useAlert } from "react-alert";
import { DefaultResponseBody } from "../../types/response";
import {
  ERROR_CODES,
  EXCEPT_ERRORCODES_MSG,
  LOGIN_PAGE_URL,
} from "../constants";

interface ErrorHandlingProps<T> {
  err: AxiosError<DefaultResponseBody<T>>;
  type: "post" | "get" | "delete" | "formData";
  url: string;
  body?: Object;
  params?: Object;
  formData?: FormData;
}

export const useError = () => {
  const message = useAlert();
  const errorHandling = async <T>({
    err,
    type,
    url,
    body,
    params,
    formData,
  }: ErrorHandlingProps<T>) => {
    console.error(err, "errorHandling");
    if (!err.response) return;
    const { status } = err.response.data;

    if (!ERROR_CODES[status]) {
      message.error(EXCEPT_ERRORCODES_MSG);
    }

    if (status === "T400") {
      message.error(ERROR_CODES[status].message, {
        onClose: () => {
          window.localStorage.clear();
          window.location.href = LOGIN_PAGE_URL;
        },
      });
    }

    if (status === "T401") {
      await grantRefresh();
      if (type === SEND_TYPE.POST) {
        if (!body) return;
        sendPost(url, body);
      }
      if (type === SEND_TYPE.GET) {
        if (!params) return;
        sendGet(url, params);
      }
      if (type === SEND_TYPE.DELETE) {
        if (!body) return;
        sendDelete(url, body);
      }
      if (type === SEND_TYPE.FORM_DATA) {
        if (!formData) return;
        sendFormData(url, formData);
      }
    } else {
      message.error(ERROR_CODES[status].message);
    }
  };
  return { errorHandling };
};
