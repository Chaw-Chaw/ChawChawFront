import { MouseEventHandler, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { Button, SelectInfoDropDown } from "../../common";
import { ListItemProps } from "../../common/ListItem";
import { ListItem } from "../../common/ListItem";
interface ProfileSelectInfoProps extends ListItemProps {
  type: string;
  count: number;
}

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];
  const message = useAlert();
  const AddButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== "Select") {
        props.setValues((preState) => {
          return [...preState, "Select"];
        });
        // console.log(props.values, "after");
      } else {
        message.info("값을 선택 후 추가 할 수 있습니다.");
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

  useEffect(() => {
    console.log(props.values, "values");
  }, [JSON.stringify(props.values)]);

  return (
    <ListItem title={props.title} description={props.description}>
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
                    fontSize="0.5rem"
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
                  fontSize="0.5rem"
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
    </ListItem>
  );
};

export default ProfileSelectInfo;

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
