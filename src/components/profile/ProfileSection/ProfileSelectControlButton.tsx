import { MouseEventHandler, SetStateAction } from "react";
import styled from "styled-components";
import { Button } from "../../common";

const ProfileSelectControlButton: React.FC<{
  values: string[];
  setValues: React.Dispatch<SetStateAction<string[]>>;
  count: number;
}> = (props) => {
  const addItem = () => {
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== "Select") {
        props.setValues((preState) => {
          return [...preState, "Select"];
        });
        return;
      }
      // message.info("값을 선택 후 추가 할 수 있습니다.");
    }
  };

  const removeItem = () => {
    // 왜 두개 이상의 배열에서 갑자기 한개로 줄어들까?
    // setState 안에서 prestate는 읽기 전용이다. 클로저 변수가 이용되기 때문에 pre값을 직접 수정하는것은 미친짓이다
    // pre 값은 고정되지 않고 연속해서 setState 가 호출될 경우 계속 해서 바뀌기 때문 따라서 바로 카피해서 고정시킨다음 사용.
    if (props.setValues) {
      props.setValues((preState) => {
        const result = [...preState];
        result.pop();
        return [...result];
      });
    }
  };
  const handleClickAddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addItem();
  };
  const handleClickControlAddButton: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    addItem();
  };
  const handleClickRemoveButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    removeItem();
  };
  const handleClickControlRemoveButton: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    removeItem();
  };

  const valuesLength = props.values.length;
  // dropbox값이 없을때
  if (valuesLength === 0)
    return <AddButton onClick={handleClickAddButton}>+</AddButton>;
  // dropbox 값이 있을때
  if (valuesLength > 0 && valuesLength < props.count)
    return (
      <ControlBtnButtonContainer>
        <ControlAddButton onClick={handleClickControlAddButton}>
          +
        </ControlAddButton>
        <ControlRemoveButton onClick={handleClickControlRemoveButton}>
          -
        </ControlRemoveButton>
      </ControlBtnButtonContainer>
    );
  // dropbox 값이 count 값만큼 꽉찼을 경우
  return <RemoveButton onClick={handleClickRemoveButton}>-</RemoveButton>;
};

export { ProfileSelectControlButton };

const AddButton = styled(Button)`
  font-family: "BMJUA";
  width: 80px;
  font-size: 1.5rem;
  text-align: center;
  margin: 0px 2.5px;
`;
const RemoveButton = styled(AddButton)``;
const ControlBtnButtonContainer = styled.div`
  font-family: "BMJUA";
  width: 80px;
  height: 30px;
  display: flex;
  margin: 0px 2.5px;
`;
const ControlAddButton = styled(AddButton)`
  width: 100%;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin: 0px;
`;
const ControlRemoveButton = styled(AddButton)`
  width: 100%;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin: 0px;
`;
