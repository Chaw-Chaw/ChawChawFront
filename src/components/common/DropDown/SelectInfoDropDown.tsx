import { SelectInfoDropDownProps } from "../../../types/common";
import { DropDown } from "./DropDown";

const SelectInfoDropDown: React.FC<SelectInfoDropDownProps> = (props) => {
  const options = [props.initialValue, ...props.options];
  return (
    <DropDown
      fontWeight="900"
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
      options={options}
      backgroundColor={props.backgroundColor}
      color={props.color}
      initialValue={props.initialValue}
      index={props.index}
      type={props.type}
      setValues={props.setValues}
      value={props.value}
    />
  );
};
export { SelectInfoDropDown };
