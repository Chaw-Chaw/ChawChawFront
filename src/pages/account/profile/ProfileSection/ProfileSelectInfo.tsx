import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Button, SelectInfoDropDown } from "../../../../components/common";
import {
  ProfileListItemProps,
  ProfileListItem,
} from "../../../../components/profile/ProfileListItem";
interface ProfileSelectInfoProps extends ProfileListItemProps {
  type: string;
  count: number;
}

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];
  const AddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== "Select") {
        props.setValues((preState) => {
          return [...preState, "Select"];
        });
        // console.log(props.values, "after");
      }
    }
  };
  const RemoveButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // 왜 두개 이상의 배열에서 갑자기 한개로 줄어들까?
    // setState 안에서 prestate는 읽기 전용이다. 클로저 변수가 이용되기 때문에 pre값을 직접 수정하는것은 미친짓이다
    if (props.setValues) {
      props.setValues((preState) => {
        const result = [...preState];
        result.pop();
        console.log(result, "removeButton");
        return [...result];
      });
    }
  };

  return (
    <ProfileListItem title={props.title} description={props.description}>
      <ButtonsBox>
        {props.values &&
          Object.values(props.values).map((item, index) => {
            if (index === 0) {
              return (
                <DropDownMainBox key={index}>
                  <DropDownMainText>main</DropDownMainText>
                  <SelectInfoDropDown
                    index={index}
                    type={props.type}
                    backgroundColor={colors[index % 3]}
                    initialValue={item}
                    setValues={props.setValues}
                    value={item}
                  />
                </DropDownMainBox>
              );
            }
            return (
              <DropDownBox key={index}>
                <SelectInfoDropDown
                  index={index}
                  type={props.type}
                  backgroundColor={colors[index % 3]}
                  initialValue={item}
                  setValues={props.setValues}
                  value={item}
                />
              </DropDownBox>
            );
          })}

        {(() => {
          if (props.values) {
            const valuesLength = Object.values(props.values).length;
            // dropbox값이 없을때
            if (valuesLength === 0)
              return <ControlBtnButton onClick={AddButton}>+</ControlBtnButton>;
            // dropbox 값이 있을때
            if (valuesLength > 0 && valuesLength < props.count)
              return (
                <ControlBtnButtonContainer>
                  <AddControlBtnButton onClick={AddButton}>
                    +
                  </AddControlBtnButton>
                  <RemoveControlBtnButton onClick={RemoveButton}>
                    -
                  </RemoveControlBtnButton>
                </ControlBtnButtonContainer>
              );
            // dropbox
            return (
              <ControlBtnButton onClick={RemoveButton}>-</ControlBtnButton>
            );
          }
        })()}
      </ButtonsBox>
    </ProfileListItem>
  );
};

export { ProfileSelectInfo };

const DropDownBox = styled.div`
  margin-right: 5px;
`;

const DropDownMainBox = styled(DropDownBox)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;
  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 10px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
`;
const ControlBtnButton = styled(Button)`
  font-family: "BMJUA";
  width: 80px;
  font-size: 1.5rem;
  text-align: center;
`;
const ControlBtnButtonContainer = styled.div`
  font-family: "BMJUA";
  width: 80px;
  height: 30px;
  display: flex;
  margin: 0px 0px;
`;
const AddControlBtnButton = styled(ControlBtnButton)`
  width: 100%;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;
const RemoveControlBtnButton = styled(ControlBtnButton)`
  width: 100%;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const ButtonsBox = styled.div`
  margin: 15px 5px 15px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
