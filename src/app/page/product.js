
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppSider from '../../component/sider/sider';
import AppHeader from '../../component/header/header';
import MainContent from '../../component/content/product_list';

const { Content } = Layout;

const ProductPage = () => {
     const [drawerVisible, setDrawerVisible] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSider
                collapsed={collapsed}
                onCollapse={setCollapsed}
                drawerVisible={drawerVisible}
                setDrawerVisible={setDrawerVisible}
                isMobile={isMobile}
            />
            <Layout style={{
                marginLeft: isMobile ? 0 : (collapsed ? '80px' : '200px'),
                transition: 'margin-left 0.2s'
            }}>
                <AppHeader
                    isMobile={isMobile}
                    onMenuClick={() => setDrawerVisible(true)}
                />
                <Content style={{ margin: '8px', minHeight: 280 }}>
                    <MainContent isMobile={isMobile} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProductPage;