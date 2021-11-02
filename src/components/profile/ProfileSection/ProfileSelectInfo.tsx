import { MouseEventHandler, SetStateAction, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { Button, CountryLocale, SelectInfoDropDown } from "../../common";
import { LanguageInfoDropDown } from "../../common/DropDown/LanguageInfoDropDown";
import { ListItem, ListItemProps } from "../../common/ListItem";
interface ProfileSelectInfoProps extends ListItemProps {
  setValues: React.Dispatch<SetStateAction<string[]>>;
  values: string[];
  type: string;
  count: number;
}

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];
  const message = useAlert();

  const addItem = () => {
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== "Select") {
        props.setValues((preState) => {
          return [...preState, "Select"];
        });
        return;
      }
      message.info("값을 선택 후 추가 할 수 있습니다.");
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

  const options = Object.keys(CountryLocale);
  const selectItemListInfo = props.values.map((item, index) => {
    return { value: item, id: index };
  });
  const selectCountryList = selectItemListInfo.map((item) => {
    if (item.id === 0) {
      return (
        <DropDownMainBox key={item.id}>
          <DropDownMainText>main</DropDownMainText>
          <SelectInfoDropDown
            index={item.id}
            type="NORMAL"
            backgroundColor={colors[item.id % 3]}
            initialValue={item.value}
            setValues={props.setValues}
            value={item.value}
            fontSize="0.5rem"
            width="80px"
            height="30px"
            fontWeight="900"
            options={options}
            color="white"
          />
        </DropDownMainBox>
      );
    }
    return (
      <DropDownBox key={item.id}>
        <SelectInfoDropDown
          index={item.id}
          type="NORMAL"
          backgroundColor={colors[item.id % 3]}
          initialValue={item.value}
          setValues={props.setValues}
          value={item.value}
          fontSize="0.5rem"
          width="80px"
          height="30px"
          fontWeight="900"
          options={options}
          color="white"
        />
      </DropDownBox>
    );
  });

  const selectLanguageList = selectItemListInfo.map((item) => {
    if (item.id === 0) {
      return (
        <DropDownMainBox key={item.id}>
          <DropDownMainText>main</DropDownMainText>
          <LanguageInfoDropDown
            index={item.id}
            backgroundColor={colors[item.id % 3]}
            setValues={props.setValues}
            value={item.value}
            fontSize="0.5rem"
            width="80px"
            height="30px"
            fontWeight="900"
            color="white"
            initialValue={item.value}
          />
        </DropDownMainBox>
      );
    }
    return (
      <DropDownBox key={item.id}>
        <LanguageInfoDropDown
          index={item.id}
          backgroundColor={colors[item.id % 3]}
          setValues={props.setValues}
          value={item.value}
          fontSize="0.5rem"
          width="80px"
          height="30px"
          fontWeight="900"
          color="white"
          initialValue={item.value}
        />
      </DropDownBox>
    );
  });

  const controlButtons = () => {
    if (props.values) {
      const valuesLength = Object.values(props.values).length;
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
      // dropbox
      return <RemoveButton onClick={handleClickRemoveButton}>-</RemoveButton>;
    }
  };

  return (
    <ListItem title={props.title} description={props.description}>
      <ButtonsBox>
        {props.type === "country" ? selectCountryList : selectLanguageList}
        {controlButtons()}
      </ButtonsBox>
    </ListItem>
  );
};

export default ProfileSelectInfo;

const DropDownBox = styled.div`
  margin: 0px 2.5px;
`;

const DropDownMainBox = styled(DropDownBox)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;
  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 5px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
`;
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

const ButtonsBox = styled.div`
  margin: 15px 5px 15px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
