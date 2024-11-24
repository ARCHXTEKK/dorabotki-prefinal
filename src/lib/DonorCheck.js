import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    Spinner,
    View,
    Panel,
    PanelHeader,
    Group,
    Div,
    Button,
    Footer,
    AdaptivityProvider,
    AppRoot, SplitLayout, SplitCol, ConfigProvider
} from '@vkontakte/vkui';
import logo from './assets/logo.png';
import sadCat from './assets/sadCat.png';
import { Icon28SearchOutline } from "@vkontakte/icons";

const DonorCheck = ({ onDonorStatusChange }) => {
    const [activePanel, setActivePanel] = useState('loading');
    const [user, setUser] = useState(null);
    const [isDonor, setIsDonor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await bridge.send('VKWebAppGetUserInfo');
                setUser(userData);

                const donorResponse = await bridge.send('VKWebAppCallAPIMethod', {
                    method: 'groups.getMembers',
                    params: {
                        group_id: '220793389',
                        filter: 'donut',
                        access_token: 'vk1.a.3j4y6iltbGis5I4qTi2vza8xbVzupsO_AJwwdYbIQV7IJlKW2w7uqBpdwAFegPQGKTvmI1HoFalYow2UUBipCLvPJYzCwW1jCq6jEdlOYL9qhoVoIlShVirHnqKajpNGTLakwPcWs6N4eUFoUl81uogIpSdcuCpMoJrpvnnIluf2gIfx7yezZPJyuD4opVUdJX_RMONYokLtbm0claV4VA',
                        v: '5.131'
                    }
                });

                if (userData && donorResponse.response && donorResponse.response.items.includes(userData.id)) {
                    setIsDonor(true);
                    onDonorStatusChange(true);
                    setActivePanel('donor');
                } else {
                    setIsDonor(false);
                    onDonorStatusChange(false);
                    setActivePanel('non-donor');
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message || error);
                setActivePanel('non-donor');
                onDonorStatusChange(false);
            }
        };

        fetchData();
    }, [onDonorStatusChange]);

    if (activePanel === 'loading') {
        return <Spinner size="large" style={{ marginTop: '20%' }} />;
    }

    return (
        <View activePanel={activePanel}>
            {isDonor ? (
                <Panel id="donor">
                    <ConfigProvider appearance="light">
                        <AdaptivityProvider>
                            <AppRoot mode="embedded">
                                <SplitLayout>
                                    <SplitCol spaced={viewWidth > 3}>
                                        <View activePanel="main">
                                            <Panel id="main">
                                                <PanelHeader>
                                                    <div className="header-center buttons-group">
                                                        <div className="header-left">
                                                            <img src={logo} alt="Logo" className="logo" />
                                                        </div>
                                                        <div className="header-navigation button-wrapper">
                                                            <Button
                                                                size="m"
                                                                mode={activeSection === 'Rubricator' ? 'primary' : 'secondary'}
                                                                onClick={() => setActiveSection('Rubricator')}
                                                                className={'left-button ' + (activeSection === 'Rubricator' ? 'primary' : 'secondary')}
                                                            >
                                                                Рубрикатор
                                                            </Button>
                                                            <Button
                                                                size="m"
                                                                mode={activeSection === 'KeywordSearch' ? 'primary' : 'secondary'}
                                                                onClick={() => setActiveSection('KeywordSearch')}
                                                                className={'button-keyword ' + (activeSection === 'KeywordSearch' ? 'primary' : 'secondary')}
                                                            >
                                                                Поиск по ключевым словам
                                                            </Button>
                                                            <Button
                                                                size="m"
                                                                mode={activeSection === 'LawSearch' ? 'primary' : 'secondary'}
                                                                onClick={() => setActiveSection('LawSearch')}
                                                                className={'button-lawsearch ' + (activeSection === 'LawSearch' ? 'primary' : 'secondary')}
                                                            >
                                                                Поиск по норме права
                                                            </Button>
                                                            <Button
                                                                size="m"
                                                                mode={activeSection === 'AdvancedSearch' ? 'primary' : 'secondary'}
                                                                onClick={() => setActiveSection('AdvancedSearch')}
                                                                className={'right-button ' + (activeSection === 'AdvancedSearch' ? 'primary' : 'secondary')}
                                                            >
                                                                Расширенный поиск
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </PanelHeader>

                                                <div className="header-with-pagination">
                                                    <h2 className="rubricator-header">{sectionTitles[activeSection]}</h2>
                                                    {activeSection !== 'KeywordSearch' && activeSection !== 'LawSearch' && (
                                                        <Pagination
                                                            currentPage={currentPage}
                                                            totalPages={totalPages}
                                                            onPageChange={setCurrentPage}
                                                        />
                                                    )}
                                                </div>

                                                <div className="rubricator-wrapper">
                                                    {activeSection === 'LawSearch' && (
                                                        <div className="search-bar-header">
                                                            <Icon28SearchOutline />
                                                            <input
                                                                type="text"
                                                                placeholder="Введите название закона..."
                                                                className="search-input"
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={`main-content ${activeSection === 'Rubricator' ? '' : 'full-width'}`}>
                                                    {activeSection === 'Rubricator' && (
                                                        <SidePanel
                                                            selectedCategory={selectedCategory}
                                                            onSelectCategory={setSelectedCategory}
                                                            searchQuery={searchQuery}
                                                            onSearch={setSearchQuery}
                                                        />
                                                    )}
                                                    <div className="content-area">
                                                        {renderActiveSection()}
                                                    </div>
                                                </div>

                                                <footer className="app-footer">
                                                    <p>© 2024,<a href="https://vk.com/law365">Мир Юриспруденции</a></p>
                                                </footer>
                                            </Panel>
                                        </View>
                                    </SplitCol>
                                </SplitLayout>
                            </AppRoot>
                        </AdaptivityProvider>
                    </ConfigProvider>
                </Panel>
            ) : (
                <Panel id="non-donor">
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
                            <p>Энциклопедия судебных актов доступна донам сообщества <a href="https://vk.com/law365" target="_blank" rel="noopener noreferrer">Мир юриспруденции</a>.</p>
                            <Button
                                size="l"
                                mode="primary"
                                onClick={() => bridge.send('VKWebAppJoinGroup', { group_id: 220793389 })}
                            >
                                Вступить в сообщество
                            </Button>
                        </Div>
                        <Footer>© 2023 - 2024, Мир юриспруденции<a href="https://vk.com/law365" target="_blank" rel="noopener noreferrer">Мир юриспруденции</a></Footer>
                    </Group>
                </Panel>
            )}
        </View>
    );
};

export default DonorCheck;
