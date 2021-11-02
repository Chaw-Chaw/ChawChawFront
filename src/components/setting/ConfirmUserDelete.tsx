import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MAIN_PAGE } from "../../constants";
import { useDeleteUser } from "../../hooks/api/account/useDeleteUser";
import { AlertMessage, Button, ModalLayout } from "../common";

const ContfirmUserDelete: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { deleteUser } = useDeleteUser();

  const handleClickOK = async () => {
    await deleteUser();
    props.setOpen(false);
    window.localStorage.clear();
    window.location.href = MAIN_PAGE;
  };
  const handleClickCancle = () => {
    props.setOpen(false);
  };

  return (
    <ModalLayout>
      <AlertMessage
        onClick={handleClickOK}
        message="회원 탈퇴시 즉시 관련된 모든 데이터가 삭제됩니다. 탈퇴 하시겠습니까? "
        type="회원 탈퇴"
      >
        <AlertMessageConfirmButton onClick={handleClickCancle}>
          취소
        </AlertMessageConfirmButton>
      </AlertMessage>
    </ModalLayout>
  );
};

export { ContfirmUserDelete };

const AlertMessageConfirmButton = styled(Button)`
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.bodyFontColor};
`;
