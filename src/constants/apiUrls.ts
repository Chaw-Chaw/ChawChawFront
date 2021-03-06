import { GOOGLE_TRANSLATE_API_KEY } from "./login";

export const LOGIN_API_URL = "/login";
export const LOGOUT_API_URL = "/logout";
export const GRANTREFRESH_API_URL = "/users/auth/refresh";
export const SENDMAIL_API_URL = "/mail/send";
export const VERIFY_WEBMAIL_API_URL = "/mail/verification";
export const SIGNUP_API_URL = "/users/signup";
export const DELETE_USER_API_URL = "/users";
export const CONFIRM_DUP_EMAIL_API_URL = "/users/email/duplicate";
export const GET_ALARMS_API_URL = "/users/alarm";
export const SEARCH_POST_API_URL = "/users";
export const GET_POSTMODAL_API_URL = "/users";
export const UPLOAD_PROFILE_API_URL = "/users/profile";
export const UPLOAD_PROFILE_IMAGE_API_URL = "/users/image";
export const DELETE_PROFILE_IMAGE_API_URL = "/users/image";
export const LIKE_API_URL = "/like";
export const UNLIKE_API_URL = "/like";
export const GET_MESSAGES_API_URL = "/chat";
export const NOTICE_MAINROOM_API_URL = "/chat/room/enter";
export const CONFIRM_CHATROOM_API_URL = "/chat/room";
export const MAKE_CHATROOM_API_URL = "/chat/room";
export const LEAVE_CHATROOM_API_URL = "/chat/room";
export const SEND_IMAGE_MSG_API_URL = "/chat/image";
export const GET_BLOCKLIST_API_URL = "/users/block";
export const BLOCK_API_URL = "/users/block";
export const UNBLOCK_API_URL = "/users/block";
export const MANAGE_USERLIST_API_URL = "/admin/users";
export const MANAGE_USER_API_URL = "/admin/users";
export const MANAGE_USER_PROFILE_API_URL = "/admin/users/profile";
export const MANAGE_DELETE_USER_API_URL = "/admin/users";
export const MANAGE_BLOCK_API_URL = "/admin/users/block";
export const MANAGE_UNBLOCK_API_URL = "/admin/users/block";
export const MANAGE_UPLOAD_PROFILE_IMAGE_API_URL = "/admin/users/image";
export const MANAGE_DELETE_PROFILE_IMAGE_API_URL = "/admin/users/image";
export const RANK_SCHOOL_API_URL = "/users/rank/school";
export const RANK_LANGUAGE_API_URL = "/users/rank/language";
export const RANK_HOPE_LANGUAGE_API_URL = "/users/rank/hopeLanguage";
export const RANK_VISITED_LANGUAGE_API_URL = "/users/rank/visited/language";
export const TRANSLATE_CONTEXT = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
