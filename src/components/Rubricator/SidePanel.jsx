import { Icon28SearchOutline } from "@vkontakte/icons";

import folderIcon1 from "../../assets/dir1.png";
import folderIcon2 from "../../assets/dir5.png";
import folderIcon3 from "../../assets/dir4.png";
import folderIcon4 from "../../assets/dir2.png";
import folderIcon5 from "../../assets/dir3.png";

import criminalIcon from "../../assets/directory.png";

import { List, Cell } from "@vkontakte/vkui";
/**

 * @description Компонент отображения. Получает на вход готовый массив категорий, по которому уже выполнен поиск и фильтрация
 * и выводит его. При нажатии на субкатегорию вызывает handleSubcategoryClick - функция меняет
 * выбранную категорию (state родительского компонента), контент которой выводится в RubricatorPanel.
 * При изменении value у input вызывается onSearch, который изменят состояние
 * родительского компонента, это состояние и передаётся в searchContent.
 *
 * @param {function} onSelectCategory - чистая функция которая меняет передаваемые в RubricatorPanel пропсы
 * @param {function} onSelectSubcategory - чистая функция которая меняет передаваемые в RubricatorPanel пропсы
 * @param {Array} categories - отфильтрованный массив с объектами категорий.
 * @param {function} onSearch - хендлер события изменения value у input.
 * @param {string} searchContent - value для input
 * @param {boolean} show - если false то компонент становится невидимым
 *
 */
export const SidePanel = ({
  onCategorySelect,
  onSearch,
  searchContent,
  categories,
  onSubcategorySelect,
  selectedCategory,
  show,
  handleSearchSubmit,
}) => {
  const icons = [
    folderIcon1,
    folderIcon2,
    folderIcon3,
    folderIcon4,
    folderIcon5,
  ];

  return (
    <div className={`side-panel ${show ? "show" : "hide"}`}>
      <div className="search-bar" style={{ borderBottom: "1px solid #F5F5F5" }}>
        <Icon28SearchOutline
          className="search-icon"
          onClick={handleSearchSubmit}
        />
        <input
          type="text"
          placeholder="Введите название раздела..."
          value={searchContent}
          onChange={onSearch}
          className="search-input"
        />
      </div>

      <List>
        {categories.map((category, index) => (
          <div key={category.id}>
            <Cell
              className={`category-cell ${
                selectedCategory === category.name ? "selected" : ""
              } ${index === 0 ? "disabled" : ""}`}
              onClick={() => onCategorySelect(category.name)}
            >
              <div className="category-title">
                <img
                  src={criminalIcon}
                  alt="Category Icon"
                  className="category-icon"
                />
                {category.name}
              </div>
            </Cell>

            <List className="subcategory-list">
              {category.subcategories.map((sub, index) => (
                <Cell
                  key={sub.id}
                  className={`subcategory-cell ${
                    selectedCategory === sub.name ? "selected" : ""
                  }`}
                  onClick={() => onSubcategorySelect(category.name, sub.name)}
                >
                  <div className="subcategory-title">
                    <img
                      src={icons[index % icons.length]}
                      alt="Subcategory Icon"
                      className="subcategory-icon"
                    />
                    {sub.name}
                  </div>
                </Cell>
              ))}
            </List>
          </div>
        ))}
      </List>
    </div>
  );
};
