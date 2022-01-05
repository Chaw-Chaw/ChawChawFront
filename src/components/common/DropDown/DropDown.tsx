import React, { MouseEventHandler, useCallback, useState } from "react";

import styled from "styled-components";
import { INFO_ALERT, INFO_ALREADY_SAMEVALUE_MSG } from "../../../constants";
import { SEARCH } from "../../../constants/post";
import { useAppDispatch } from "../../../hooks/redux";
import { alertActions } from "../../../store/alertSlice";
import { DropDownProps } from "../../../types/common";
import { DropDownBox } from "./DropDownBox";
import { Option } from "./Option";

const MDropDown: React.FC<DropDownProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const { index, setValues } = props;

  const saveInfo = useCallback(
    (item: string) => {
      if (setValues && index !== undefined) {
        setValues((preState) => {
          const result = preState;
          if (result.includes(item)) {
            dispatch(
              alertActions.updateAlert({
                name: INFO_ALERT,
                message: INFO_ALREADY_SAMEVALUE_MSG,
              })
            );
            return result;
          }
          result[index] = item;
          return [...result];
        });
      }
    },
    [dispatch, index, setValues]
  );

  const handleClickDropDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((isActive) => !isActive);
    },
    []
  );

  const handleMouseLeaveDropDown: MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      e.preventDefault();
      setIsActive(false);
    }, []);

  const selectOptionList = props.options.map((item, index) => {
    return { value: item, id: index };
  });

  const options = selectOptionList.map((item) => {
    return <Option key={item.id} item={item.value} saveInfo={saveInfo} />;
  });

  return (
    <DropDownBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={handleClickDropDown}
      color={
        props.type === SEARCH && props.initialValue !== props.value
          ? props.backgroundColor
          : props.color
      }
      backgroundColor={
        props.type === SEARCH && props.initialValue !== props.value
          ? props.color
          : props.backgroundColor
      }
      value={props.value}
    >
      <SelectMenu
        width={props.width}
        isActive={isActive}
        onMouseLeave={handleMouseLeaveDropDown}
      >
        {options}
      </SelectMenu>
      {props.children}
    </DropDownBox>
  );
};

const DropDown = React.memo(MDropDown);
export { DropDown };
export type { DropDownProps };

const SelectMenu = styled.div<{ width: string; isActive: boolean }>`
  padding: 4px 0px;
  position: absolute;
  width: ${(props) => props.width};
  border-radius: 10px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 40px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.bodyFontColor};
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
  overflow: auto;
  max-height: 200px;
  z-index: 100;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;
