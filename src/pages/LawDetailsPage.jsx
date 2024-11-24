import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import backtosearchicon from "../assets/backtosearchicon.png";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import displayicon from "../assets/displayicon.png";
import downicon from "../assets/downicon.png";
import { useLawDetailsState } from "../hooks/useLawDetailsState";
import { Icon28SearchOutline } from "@vkontakte/icons";
import { useLawSearchState } from "../hooks/useLawSearchState";

// export default function LawDetailsPage() {
//   const routeNavigator = useRouteNavigator();

//   const handleBack = () => {
//     routeNavigator.back();
//   };

//   const {
//     searchContent,
//     onSearch,
//     showDisplayOptions,
//     onDisplayOptionsClick,
//     displayOptionsState,
//     onDisplayOptionToggle,
//   } = useLawSearchState();

//   const {} = useLawDetailsState();

//   return (
//     <div className="app-wrapper">
//       <Header />
//       <main className="page-content">
//         <h2 className="page-title">Поиск по норме права</h2>
//         <div className="law-detail">
//           <div className="law-search-input-wrapper">
//             <Icon28SearchOutline style={{ paddingLeft: "6px" }} />
//             <input
//               type="text"
//               placeholder="Введите номер статьи..."
//               value={searchContent}
//               onChange={onSearch}
//               className="law-search-input"
//             />
//           </div>
//           <div className="law-search-controls">
//             <div className="law-search-buttons">
//               <div
//                 сlassName="backtoalphabet"
//                 onClick={handleBack}
//                 style={{
//                   margin: "5px 10px 0px 0px",
//                   borderRadius: "5px",
//                   color: "#fff",
//                   padding: "0px 10px 0px",
//                   display: "flex",
//                   alignItems: "center",
//                   backgroundColor: "#3871e0",
//                   height: "32.5px",
//                 }}
//               >
//                 <img
//                   src={backtosearchicon}
//                   style={{ height: "15px", padding: "2px 5px 0px 0px" }}
//                 />
//                 Вернуться к списку
//               </div>
//               <div className="display-button" onClick={onDisplayOptionsClick}>
//                 <img src={displayicon} alt="Отображение" />
//                 <button className="law-search-button">Отображение</button>
//                 <img
//                   src={downicon}
//                   alt="downicon"
//                   style={{ height: "5px", marginTop: "5px" }}
//                 />
//               </div>
//               {showDisplayOptions && (
//                 <div className="options-container">
//                   <ul>
//                     <li>
//                       <label className="toggle-switch">
//                         <input
//                           type="checkbox"
//                           checked={displayOptionsState[0]}
//                           onChange={() => onDisplayOptionToggle(0)}
//                         />
//                         <span className="switch" />
//                         <span style={{ width: "95px" }}>Конституция</span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="toggle-switch">
//                         <input
//                           type="checkbox"
//                           checked={displayOptionsState[1]}
//                           onChange={() => onDisplayOptionToggle(1)}
//                         />
//                         <span className="switch" />
//                         <span style={{ width: "95px" }}>Кодексы</span>
//                       </label>
//                     </li>
//                     <li>
//                       <label className="toggle-switch">
//                         <input
//                           type="checkbox"
//                           checked={displayOptionsState[2]}
//                           onChange={() => onDisplayOptionToggle(2)}
//                         />
//                         <span className="switch" />
//                         <span style={{ width: "95px" }}>Законы</span>
//                       </label>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* <div className="selectedLaw-content">
//             <h2>{selectedLaw.title}</h2>
//             <p>{selectedLaw.content}</p>
//             <div className="sections">
//               {selectedLaw.sections
//                 .filter((section) => filterSection(section, searchQuery))
//                 .map((section, index) => (
//                   <div key={index} className="section">
//                     <h3 onClick={() => toggleSection(index)}>
//                       {expandedSections[index] ? (
//                         <span className="expand-icon">&#5171;</span>
//                       ) : (
//                         <span className="expand-icon">&#5167;</span>
//                       )}
//                       {section.title}
//                     </h3>
//                     {expandedSections[index] && (
//                       <ul>
//                         {section.points
//                           .filter((point) => filterPoint(point, searchQuery))
//                           .map((point, pointIndex) => (
//                             <li key={pointIndex}>{point}</li>
//                           ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div> */}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

export default function LawDetailsPage() {
  return <div></div>;
}
