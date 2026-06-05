import React from "react";

export const EyeToggleButton = ({showPassword,setShowPassword,styles}) => {
  return (<button
            className={styles.hideToggle}
            type="button"
            onClick={() => setShowPassword(prev => !prev)}>
            <img
              src={`/assets/images/${showPassword ? "eye-open" : "eye-hidden"}.png`}
            />
          </button>);
}