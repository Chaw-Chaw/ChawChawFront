import React, { MouseEventHandler, SetStateAction } from "react";
import styled from "styled-components";
import { INFO_AFTER_SELECT_MSG, INFO_ALERT } from "../../../constants";
import { SELECT } from "../../../constants/profile";
import { useAppDispatch } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";
import { Button } from "../../common";

const MProfileSelectControlButton: React.FC<{
  values: string[];
  setValues: React.Dispatch<SetStateAction<string[]>>;
  count: number;
}> = (props) => {
  const dispatch = useAppDispatch();
  const addItem = () => {
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== SELECT) {
        props.setValues((preState) => {
          return [...preState, SELECT];
        });
        return;
      }
      dispatch(
        alertActions.updateAlert({
          name: INFO_ALERT,
          message: INFO_AFTER_SELECT_MSG,
        })
      );
    }
  };

  const removeItem = () => {
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

const ProfileSelectControlButton = React.memo(MProfileSelectControlButton);
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
