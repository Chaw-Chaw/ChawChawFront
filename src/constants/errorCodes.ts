export const ERROR_CODES: {
  [index: string]: {
    statusText: string;
    message: string;
  };
} = {
  G200: {
    statusText: "성공",
    message: "",
  },
  G400: {
    statusText: "해당 아이디가 존재하지 않음",
    message: "해당 아이디가 존재하지 않습니다.",
  },
  G401: {
    statusText: "자기 자신 선택 불가능",
    message: "자기 자신을 선택할 수는 없습니다.",
  },

  G402: {
    statusText: "차단한 또는 차단된 유저",
    message: "유저로 부터 차단되었거나 유저를 차단하셨습니다.",
  },
  G403: {
    statusText: "다른 곳에서 접속함",
    message:
      "현재 같은 아이디로 다른 곳에서 접속 중입니다. 계속 이용하시려면 다시 로그인 해주세요.",
  },
  G404: {
    statusText: "파일 타입이 잘못 됨",
    message: "파일 타입이 잘 못 되었습니다.",
  },
  G405: {
    statusText: "요청 파라미터가 잘못됨",
    message: "요청 파라미터가 잘못 되었습니다.",
  },
  G500: {
    statusText: "DB 오류",
    message: "서버 데이터 베이스 오류 입니다.",
  },
  T400: {
    statusText: "Access Token 만료",
    message: "Access Token 형식이 잘못됨",
  },
  T401: {
    statusText: "Access Token 형식이 잘못됨",
    message: "accessToken이 형식이 잘못되었습니다.",
  },
  E400: {
    statusText: "대학생용 이메일이 아닙니다.",
    message: "ChawChaw에 등록되지 않은 대학의 웹메일 입니다.",
  },
  E401: {
    statusText: "인증 번호 검증 실패",
    message: "인증 번호 검증에 실패하였습니다.",
  },
  E402: {
    statusText: "인증번호 시간이 만료됨",
    message: "인증번호 시간이 만료되었습니다.",
  },
  U400: {
    statusText: "로그인 실패",
    message: "아이디 혹은 비밀번호가 잘못되었습니다.",
  },
  U401: {
    statusText: "비정상적인 로그인 접근",
    message: "비정상적인 로그인 시도 입니다.",
  },
  U402: {
    statusText: "회원가입 필요",
    message: "회원가입이 필요합니다.",
  },
  U403: {
    statusText: "로그아웃 실패",
    message: "로그아웃이 실패했습니다.",
  },
  U404: {
    statusText: "비밀번호가 일치하지 않음",
    message: "비밀번호가 일치하지 않습니다.",
  },
  U405: {
    statusText: "해당 이메일이 존재함",
    message: "이미 가입된 이메일 입니다.",
  },
  T402: {
    statusText: "Refresh Token 존재하지 않음",
    message: "다시 로그인 해 주세요.",
  },
  T403: {
    statusText: "사용할 수 없는 Refresh Token",
    message: "다시 로그인 해 주세요.",
  },
  T404: {
    statusText: "Refresh Token 만료",
    message: "다시 로그인 해 주세요.",
  },
  T405: {
    statusText: "Refresh Token 형식이 잘못됨",
    message: "다시 로그인 해 주세요.",
  },
  U407: {
    statusText: "프로필 업로드 실패",
    message: "프로필 이미지 수정에 실패하였습니다.",
  },
  U408: {
    statusText: "프로필 제거 실패",
    message: "프로필 초기화에 실패하였습니다.",
  },
  L400: {
    statusText: "이미 좋아요 대상",
    message: "이미 좋아요한 대상입니다.",
  },
  L401: {
    statusText: "좋아요 하지 않은 대상",
    message: "좋아요 상태가 아닙니다.",
  },
  C400: {
    statusText: "방 이동 실패",
    message: "메인 방으로 이동 실패하였습니다.",
  },
  C401: {
    statusText: "채팅방 존재함",
    message: "이미 채팅방이 존재합니다.",
  },
  C402: {
    statusText: "채팅방 존재하지 않음",
    message: "채팅방이 존재하지 않습니다.",
  },
  C403: {
    statusText: "채팅방 이미지 업로드 실패",
    message: "채팅 이미지 업로드에 실패하였습니다.",
  },
  B400: {
    statusText: "이미 차단된 대상",
    message: "이미 차단된 대상입니다.",
  },
  B401: {
    statusText: "차단되지 않은 대상",
    message: "차단되지 않은 유저입니다.",
  },
  A401: {
    statusText: "이미 차단된 대상",
    message: "이미 차단된 대상 입니다.",
  },
  A402: {
    statusText: "차단되지 않은 대상",
    message: "차단되지 않은 대상입니다.",
  },
  A403: {
    statusText: "프로필 업로드 실패",
    message: "프로필 이미지 수정에 실패하였습니다. ",
  },
  A404: {
    statusText: "프로필 제거 실패",
    message: "프로필 이미지 초기화에 실패하였습니다.",
  },
  S400: {
    statusText: "조회 결과가 존재하지 않음",
    message: "조회 결과가 존재하지 않습니다.",
  },
};

export const SEND_TYPE: {
  POST: "post";
  GET: "get";
  DELETE: "delete";
  FORM_DATA: "formData";
} = {
  POST: "post",
  GET: "get",
  DELETE: "delete",
  FORM_DATA: "formData",
};

export const EXCEPT_ERRORCODES_MSG = "파악하지 못한 API 에러 입니다.";
export const EXCEPT_ERROR_MSG = "파악하지 못한 에러 입니다.";
