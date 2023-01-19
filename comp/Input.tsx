"use client";
import styles from "../styles/input.module.scss";

interface InputProps {
  spanText?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  rows?: number;
  value: string;
}

const Input: React.FC<InputProps> = ({
  spanText,
  placeholder,
  onChange,
  rows,
  value,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <label>{spanText ? <span>{spanText}</span> : null}</label>
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          rows={rows}
          value={value}
        />
      </div>
    </>
  );
};

export default Input;
