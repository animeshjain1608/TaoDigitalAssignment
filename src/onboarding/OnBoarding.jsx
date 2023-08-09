import React, { useState, useMemo, useReducer } from "react";
import StepIndicator from "./stepIndicator/StepIndicatorComponent";
import classes from "./OnBoarding.module.scss";
import CheckIcon from "../assets/images/check.png";
import Logo from "../assets/images/edenlogo.png";
import SelfIcon from "../assets/images/self.png";
import TeamIcon from "../assets/images/team.png";
import Input from "../InputComponent/Input";

const actionTypes = {
  FULL_NAME: "fullName",
  DISPLAY_NAME: "displayName",
  WORKSPACE_NAME: "workspaceName",
  WORKSPACE_URL: "workspaceUrl",
  PLAN_TYPE: "planType",
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case actionTypes.FULL_NAME:
      return { ...state, [actionTypes.FULL_NAME]: action.payload };
    case actionTypes.DISPLAY_NAME:
      return { ...state, [actionTypes.DISPLAY_NAME]: action.payload };
    case actionTypes.WORKSPACE_NAME:
      return { ...state, [actionTypes.WORKSPACE_NAME]: action.payload };
    case actionTypes.WORKSPACE_URL:
      return { ...state, [actionTypes.WORKSPACE_URL]: action.payload };
      case actionTypes.PLAN_TYPE:
        return { ...state, [actionTypes.PLAN_TYPE]: action.payload };
    default:
      return state;
  }
};

const OnBoarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [state, dispatch] = useReducer(reducerFn, {
      [actionTypes.FULL_NAME]: '',
      [actionTypes.DISPLAY_NAME]: '',
      [actionTypes.WORKSPACE_NAME]: '',
      [actionTypes.WORKSPACE_URL]: '',
      [actionTypes.PLAN_TYPE]: 'self',
  });

  const { title, subtitle } = useMemo(() => {
    let title = "",
      subtitle = "";
    switch (currentStep) {
      case 1:
        title = "Welcome! First things first...";
        subtitle = "You can always change them later.";
        break;
      case 2:
        title = "Let's set up a home for all your work";
        subtitle = "You can always create another workspace later.";
        break;
      case 3:
        title = "How are you planning to use Eden?";
        subtitle = "We'll streamline your setup experience accordingly.";
        break;
      case 4:
        title = "Congratulations, " + state[actionTypes.FULL_NAME] + "!";
        subtitle =
          "You have completed the onboarding, you can start using the Eden!";
        break;
      default:
        break;
    }
    return { title, subtitle };
  }, [currentStep, state]);

  const isCompletedStep = currentStep === 4;

  const onSubmitHandler = () => {
    if (isCompletedStep) {
      alert("Launching the App...");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const onInput = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const onPlanChange=(value)=>{
    dispatch({
        type: actionTypes.PLAN_TYPE,
        payload: value,
      });
  }

  const renderInnerContainer = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input
              onInput={onInput}
              value={state[actionTypes.FULL_NAME]}
              name={actionTypes.FULL_NAME}
              id={actionTypes.FULL_NAME}
              placeholder="Steve Jobs"
              label="Full Name"
              ref={null}
            />
            <Input
              onInput={onInput}
              value={state[actionTypes.DISPLAY_NAME]}
              name={actionTypes.DISPLAY_NAME}
              placeholder="Steve"
              label="Display Name"
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              onInput={onInput}
              value={state[actionTypes.WORKSPACE_NAME]}
              name={actionTypes.WORKSPACE_NAME}
              id={actionTypes.WORKSPACE_NAME}
              placeholder="Eden"
              label="Workspace Name"
            />
            <Input
              onInput={onInput}
              value={state[actionTypes.WORKSPACE_URL]}
              name={actionTypes.WORKSPACE_URL}
              mode="split"
              prefix="www.eden.com/"
              placeholder="Example"
              label="Workspace URL"
              secondaryLabel="(optional)"
            />
          </>
        );
      case 3:
        return (
          <>
            <div className={classes.planContainer}>
              <div
                role={"button"}
                onClick={()=>onPlanChange("self")}
                className={[classes.option, state[actionTypes.PLAN_TYPE]==="self" && classes.active].join(' ')}
              >
                <img src={SelfIcon} className={classes.icon} alt="self-img"/>
                <div className={classes.title}>For myself</div>
                <div className={classes.subtitle}>Write better. Think more clearly. Stay organised.</div>
              </div>
              <div
                role={"button"}
                onClick={()=>onPlanChange("team")}
                className={[classes.option, state[actionTypes.PLAN_TYPE]==="team" && classes.active].join(' ')}
              >
                <img src={TeamIcon} className={classes.icon} alt="team-img" />
                <div className={classes.title}>With my team</div>
                <div className={classes.subtitle}>Wikis, docs, tasks & projects, all in one place.</div>
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.appLogo}>
        <img className={classes.logo} src={Logo} alt="app logo" />
      </div>
      <StepIndicator
        totalSteps={4}
        currentStep={currentStep}
        setStep={setCurrentStep}
      />
      {isCompletedStep && <img src={CheckIcon} alt="complete-img"/>}
      <h2 className="title">{title}</h2>
      <small className="subtitle">{subtitle}</small>

      <div className={classes.innerContainer}>
        {renderInnerContainer()}
        <button className={classes.submitBtn} onClick={onSubmitHandler}>
          {isCompletedStep ? "Launch Eden" : "Create Workspace"}
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
