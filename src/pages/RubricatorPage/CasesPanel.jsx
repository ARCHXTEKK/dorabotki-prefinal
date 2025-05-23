import { Cell, List } from "@vkontakte/vkui";
import PreLoader from "../../shared/PreLoader";

/**
 * @description Компонент отображения. Получает на вход массив кейсов и просто выводит его.
 * @param {Array} cases - массив кейсов
 * @param {function} handleCaseClick - хендлер клика на кейс. Должен переходить на страницу кейса.
 */
export const CasesPanel = ({ cases, handleCaseClick }) => {
  return (
    <div className="case-list-wrapper">
      {cases.length === 0 && <PreLoader />}
      <List>
        {cases.map((caseData, index) => (
          <Cell
            key={index}
            description={caseData.description}
            className={`case-cell`}
            onClick={() => handleCaseClick(caseData)}
          >
            <div className="case-title">{caseData.section_title}</div>
            <div className="case-description">
              {caseData.section_description}
            </div>
          </Cell>
        ))}
      </List>
    </div>
  );
};
