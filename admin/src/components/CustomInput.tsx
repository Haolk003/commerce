import React from "react";
import { Input } from "antd";
import { Field } from "formik";
interface InputProps {
  type: string;
  label: string;
  i_id: string;
  i_class: string;
  val?: string;
  onCh?: (e: any) => void;
  onBl?: () => void;
}
const CustomInput: React.FC<InputProps> = ({
  type,
  label,
  i_id,
  i_class,
  val,
  onCh,
  onBl,
}) => {
  return (
    <div className="form-floating mt-3 flex items-center gap-3">
      <p className="w-[180px] font-semibold text-sm">{label}:</p>
      <Input
        type={type}
        size="large"
        className={`${i_class} `}
        id={`${i_id}`}
        placeholder={label}
        name={`${i_id}`}
        onChange={onCh}
        // onBlur={onBl}
        value={val}
      />
    </div>
  );
};

export default CustomInput;
