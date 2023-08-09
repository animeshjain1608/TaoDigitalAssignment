import { forwardRef } from "react";
import classes from "./Input.module.scss";

const Input = forwardRef((
  {
    label,
    prefix = "",
    mode = "normal",
    secondaryLabel,
    ...inputElementProps
  },
  ref
) => {
  const getInput = () => {
    switch (mode) {
      case "split":
        return (
          <div className={classes.splitContainer}>
            <span className={classes.left}>{prefix}</span>
            <input {...inputElementProps} ref={ref} className={classes.input} />
          </div>
        );
      case "normal":
        return <input {...inputElementProps} ref={ref} className={classes.input}/>;
      default:
        break;
    }
  };

  return (
    <div className={classes.container}>
      <label className={classes.label}>
        {label}{" "}
        {secondaryLabel && (
          <span className={classes.secondaryLabel}>{secondaryLabel}</span>
        )}
      </label>
      {getInput()}
    </div>
  );
});

export default Input;
