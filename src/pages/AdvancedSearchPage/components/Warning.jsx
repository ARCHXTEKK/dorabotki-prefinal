import React from "react";
import WarningIcon from "../../../assets/vectors/WarningIcon";

export default function Warning() {
  return (
    <div className="warning">
      <WarningIcon className="warning-icon" />
      <div>
        Обратите внимание: вам необязательно заполнять все поля данной формы.
        Для начала поиска достаточно заполнения одного любого поля.
      </div>
    </div>
  );
}
