import React from "react";
import classes from "./StepIndicatorComponent.module.scss";

const StepIndicator = ({ totalSteps, currentStep, setStep }) => {
  const stepArr = new Array(totalSteps).fill(null);
  const onStepClick = (stepNo) => stepNo <= currentStep && setStep?.(stepNo);

  return (
    <div className={classes.container}>
      {stepArr.map((_, stepNo) => {
        const translatedStepNo = stepNo + 1;
        const isCompleted = translatedStepNo <= currentStep;
        return (
          <div
            className={[classes.stepBalloon, isCompleted && classes.active].join(' ')}
            onClick={() => onStepClick(translatedStepNo)}
            key={translatedStepNo}
            role="button"
            aria-disabled={!isCompleted}
          >
            {translatedStepNo}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
