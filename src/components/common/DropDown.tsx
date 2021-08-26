import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { ImEarth } from "react-icons/im";
import { CountryLocale, CountryEmojiNames, LanguageNames } from "../common";
import { AuthContext } from "../../store/AuthContext";
import { CountryEmoji, LocaleLanguage, LanguageLocale } from "./LocaleList";

interface initialBoxProps {
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
}
interface DropDownProps extends initialBoxProps {
  options?: any;
  color?: string;
  initialValue?: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseLeave?: () => void;
  postOrder?: boolean;
  value?: string;
  index?: number;
  type?: string;
  setValues?: Dispatch<SetStateAction<string[]>>;
}

interface SelectMenuProps extends DropDownProps {}
interface SelectInfoDropDownProps extends DropDownProps {}
// interface;

const InitialBox = styled.div<initialBoxProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.fontWeight};
  padding: 4px 8px;
  border-radius: 10rem;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  font-size: ${(props) => props.fontSize};
  font-family: "Source Sans Pro";
  width: ${(props) => props.width};
  box-sizing: border-box;
  height: ${(props) => props.height};
  color: ${(props) => {
    if (props.color) return props.color;
    if (props.theme.id === "light") return "black";
    else {
      return "white";
    }
  }};
  background-color: ${(props) => {
    if (props.backgroundColor) return props.backgroundColor;
    else {
      props.theme.bodyBackgroundColor;
    }
  }};
  svg {
    position: absolute;
    left: 5px;
  }

  font-family: "BMJUA";

  :hover {
    cursor: pointer;
  }
  // 드래그 방지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

const SelectMenu = styled.div<SelectMenuProps>`
  padding: 4px 0px;
  position: absolute;
  width: ${(props) => props.width};
  border-radius: 10px;
  /* border: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"}; */
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  top: 40px;
  left: 0px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5); */
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

const Option = styled.div<SelectMenuProps>`
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;
// const;

const DropDownBox: React.FC<DropDownProps> = (props) => {
  const clickHander: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <InitialBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={clickHander}
      color={props.color}
      backgroundColor={props.backgroundColor}
    >
      {props.children}
      <span>{props.value}</span>
    </InitialBox>
  );
};

const DropDown: React.FC<DropDownProps> = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const [isActive, setIsActive] = useState(false);
  const index = props?.index;
  const option = props.options;
  const setInfo = (item: string) => {
    if (props.setValues && index !== undefined) {
      props.setValues((preState) => {
        preState[index] = item;
        return [...preState];
      });
    }
  };

  return (
    <DropDownBox
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      onClick={() => setIsActive((isActive) => !isActive)}
      onMouseLeave={() => setIsActive(false)}
      color={
        props.postOrder && props.initialValue !== props.value
          ? props.backgroundColor
          : props.color
      }
      backgroundColor={
        props.postOrder && props.initialValue !== props.value
          ? props.color
          : props.backgroundColor
      }
      value={value}
    >
      <SelectMenu
        width={props.width}
        height={props.height}
        isActive={isActive}
        onMouseLeave={() => setIsActive(false)}
      >
        {option?.map((item: string, index: number) => {
          return (
            <Option
              key={index}
              onClick={() => {
                if (item) {
                  setValue(item);
                  setInfo(item);
                }
              }}
            >
              {item}
            </Option>
          );
        })}
      </SelectMenu>
      {props.children}
    </DropDownBox>
  );
};

const ChangeLanguageDropDown: React.FC = (props) => {
  const localeList = Object.values(LanguageLocale)
    .map((item: any) => item.toUpperCase())
    .sort();

  return (
    <DropDown
      fontWeight="600"
      fontSize="1em"
      width="80px"
      height="30px"
      options={localeList}
      initialValue="KR"
    >
      <ImEarth />
    </DropDown>
  );
};

const SelectInfoDropDown: React.FC<SelectInfoDropDownProps> = (props) => {
  const countryList = [props.initialValue, ...Object.keys(CountryLocale)];
  const languageList = [props.initialValue, ...Object.values(LocaleLanguage)];

  return (
    <DropDown
      fontWeight="900"
      fontSize={props.fontSize ? props.fontSize : "0.7rem"}
      width={props.width ? props.width : "80px"}
      height={props.height ? props.height : "30px"}
      options={(() => {
        if (props.options) return props.options;
        if (props.type === "country") return countryList;
        if (props.type === "language" || props.type === "hopeLanguage")
          return languageList;
        else return countryList;
      })()}
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : "#06C074"
      }
      color={props.color ? props.color : "white"}
      initialValue={(() => {
        if (props.initialValue) return props.initialValue;
        if (props.type === "country") return "Select Country";
        if (props.type === "language" || props.type === "hopeLanguage")
          return "Select Language";
        else return "Select";
      })()}
      postOrder={props.postOrder}
      index={props.index}
      type={props.type}
      setValues={props.setValues}
    />
  );
};

export { DropDown, ChangeLanguageDropDown, SelectInfoDropDown, DropDownBox };
