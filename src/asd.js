import React, { useEffect, useState } from 'react';
import { View, Panel, PanelHeader, Group, Div, List, Cell, Button, Footer, Spinner, Header } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import logo from './assets/logo.png';
import sadCat from './assets/sad-cat.png';
import directoryImage from './assets/directory.png';

// Данные для боковой панели (категории)
const categories = [
    { title: "Судебная практика по гражданским делам", id: 1 },
    { title: "Судебная практика по Гражданскому кодексу", id: 2 },
    { title: "Судебная практика по трудовым спорам", id: 3 },
    { title: "Судебная практика по семейным делам", id: 4 },
    { title: "Судебная практика по жилищным спорам и ЖКХ", id: 5 },
    { title: "Судебная практика по социальному обеспечению", id: 6 },
    { title: "Судебная практика по уголовным делам", id: 7, active: true },
    { title: "Судебная практика по административным делам", id: 8 }
];

// Основные элементы (дела)
const cases = [
    { title: "Дела о клевете", description: "Судебная практика по применению нормы ст. 128.1 УК РФ" },
    { title: "Дела об убийстве", description: "Судебная практика по применению нормы ст. 105 УК РФ" },
    { title: "Дела о мошенничестве", description: "Судебная практика по применению нормы ст. 159 УК РФ" },
    { title: "Дела о побоях", description: "Судебная практика по применению нормы ст. 116 УК РФ" },
    { title: "Дела о самоуправстве", description: "Судебная практика по применению нормы ст. 330 УК РФ" },
    { title: "Дела о краже", description: "Судебная практика по применению нормы ст. 158 УК РФ" },
    { title: "Дела о разбое", description: "Судебная практика по применению нормы ст. 162 УК РФ" },
    { title: "Дела о привлечении к уголовной ответственности несовершеннолетних", description: "Судебная практика по применению нормы ст. 87 УК РФ" },
    { title: "Дела о присвоении и растратах", description: "Судебная практика по применению нормы ст. 160 УК РФ" },
    { title: "Дела о хулиганстве", description: "Судебная практика по применению нормы ст. 213 УК РФ" },
    { title: "Дела о грабежах", description: "Судебная практика по применению нормы ст. 161 УК РФ" },
    { title: "Дела о халатности", description: "Судебная практика по применению нормы ст. 293 УК РФ" }
];

// Компонент для боковой панели
const SidePanel = ({ selectedCategory, onSelectCategory, searchQuery, onSearch }) => (
    <div style={{ width: '25%', paddingRight: '10px' }}>
        <input
            type="text"
            placeholder="Поиск категорий"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />
        <List>
            {categories.filter(category => category.title.toLowerCase().includes(searchQuery.toLowerCase())).map((category, index) => (
                <Cell
                    key={index}
                    style={{
                        backgroundColor: selectedCategory === category.title ? '#e6f7ff' : 'transparent',
                        fontWeight: selectedCategory === category.title ? 'bold' : 'normal',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    onClick={() => onSelectCategory(category.title)}
                >
                    <img src={directoryImage} alt="Directory Icon"
                         style={{width: '24px', height: '24px', marginRight: '10px'}}/>
                    {category.title}
                </Cell>
            ))}
        </List>
    </div>
);

// Компонент для отображения списка дел
const CaseList = ({selectedCategory, currentPage, totalPages, onPageChange }) => (
    <div style={{ width: '75%' }}>
        <div style={{ padding: '0 20px' }}>
            <h2>{selectedCategory}</h2>
            <List>
                {cases.slice((currentPage - 1) * 10, currentPage * 10).map((caseItem, index) => (
                    <Cell
                        key={index}
                        description={caseItem.description}
                        style={{
                            padding: '10px 20px',
                            borderBottom: '1px solid #f0f0f0',
                            cursor: 'pointer'
                        }}
                        onClick={() => console.log(`Выбрано дело: ${caseItem.title}`)}
                    >
                        {caseItem.title}
                    </Cell>
                ))}
            </List>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    </div>
);

// Компонент для пагинации
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
            size="m"
            mode="secondary"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            Назад
        </Button>
        <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
        <Button
            size="m"
            mode="secondary"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            Вперед
        </Button>
    </div>
);

// Компонент для панели заголовка
const PanelHeaderWithSearch = () => (
    <PanelHeader>
        <img src={logo} alt="Logo" style={{ height: '30px', margin: '0 10px' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px' }}>Рубрикатор</span>
            <input
                type="text"
                placeholder="Поиск по ключевому слову"
                style={{ marginRight: '10px', padding: '5px' }}
            />
            <Button size="s" mode="secondary" style={{ marginRight: '5px' }}>Поиск по норме права</Button>
            <Button size="s" mode="secondary">Расширенный поиск</Button>
        </div>
    </PanelHeader>
);

// Главная страница с боковой панелью и основным содержанием
const MainPage = ({ user, selectedCategory, onSelectCategory, searchQuery, onSearch }) => (
    <Panel id="General">
        <PanelHeaderWithSearch />
        <Group header={<Header mode="secondary">Рубрикатор судебных актов</Header>}>
            <Div style={{ display: 'flex' }}>
                <SidePanel selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} searchQuery={searchQuery} onSearch={onSearch} />
                <CaseList selectedCategory={selectedCategory} currentPage={1} totalPages={Math.ceil(cases.length / 10)} onPageChange={() => {}} />
            </Div>
        </Group>
    </Panel>
);

const App = () => {
    const [activePanel, setActivePanel] = useState('loading');
    const [user, setUser] = useState(null);
    const [isDonor, setIsDonor] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Судебная практика по уголовным делам');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(cases.length / itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await bridge.send('VKWebAppGetUserInfo');
                console.log('User Data:', userData);
                setUser(userData);

                const donorResponse = await bridge.send('VKWebAppCallAPIMethod', {
                    method: 'groups.getMembers',
                    params: {
                        group_id: '220793389',
                        filter: 'donut',
                        access_token: 'vk1.a.3j4y6iltbGis5I4qTi2vza8xbVzupsO_AJwwdYbIQV7IJlKW2w7uqBpdwAFegPQGKTvmI1HoFalYow2UUBipCLvPJYzCwW1jCq6jEdlOYL9qhoVoIlShVirHnqKajpNGTLakwPcWs6N4eUFoUl81uogIpSdcuCpMoJrpvnnIluf2gIfx7yezZPJyuD4opVUdJX_RMONYokLtbm0claV4VA',
                        v: '5.199'
                    }
                });

                console.log('Donor Response:', donorResponse);

                if (userData && donorResponse.response && donorResponse.response.items.includes(userData.id)) {
                    setIsDonor(true);
                    setActivePanel('General');
                } else {
                    setIsDonor(false);
                    setActivePanel('main');
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message || error);
                setActivePanel('main');
            }
        };

        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (activePanel === 'loading') {
        return <Spinner size="large" style={{ marginTop: '20%' }} />;
    }

    return (
        <View activePanel={activePanel}>
            {/* Панель "Главная" для доноров */}
            <Panel id="General">
                <MainPage
                    user={user}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                />
            </Panel>

            {/* Панель "Основная" для недоносов */}
            <Panel id="main">
                <PanelHeader>
                    <center>
                        <img src={logo} alt="Logo" style={{ marginTop: '20px', marginBottom: '10px', maxHeight: '40px' }} />
                    </center>
                </PanelHeader>
                <Group>
                    <Div style={{ textAlign: 'center', padding: '20px' }}>
                        <img src={sadCat} alt="Sad Cat" style={{ marginBottom: '20px', maxWidth: '100px' }} />
                        {user && <h2>Здравствуйте, {user.first_name}!</h2>}
                        <p>К сожалению, у Вас нет доступа к данному приложению.</p>
                        <p>Энциклопедия судебных актов доступна донам сообщества <a href="https://vk.com/law365" target="_blank"
                                                                                    rel="noopener noreferrer">Мир юриспруденции</a>.
                        </p>
                        <Button
                            size="l"
                            mode="primary"
                            onClick={() => bridge.send('VKWebAppJoinGroup', { group_id: 220793389 })}
                        >
                            Вступить в сообщество
                        </Button>
                        <Button size="l" mode="primary" onClick={()=>}></Button>
                    </Div>
                    <Footer>© 2023 - 2024, Мир юриспруденции<a href="https://vk.com/law365" target="_blank"
                                                               rel="noopener noreferrer">Мир юриспруденции</a></Footer>
                </Group>
            </Panel>
        </View>
    );
};

export default App;
