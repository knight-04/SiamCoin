import React, { useState, useEffect } from 'react';
import { Layout, Badge, Space, Row, Col, Button } from 'antd';
import {
    ShoppingCartOutlined,
    UserOutlined,
    MenuOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ onMenuClick }) => { 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Header style={{
            background: '#fff',
            padding: 0,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#e65f2b',
            height: '56px'
        }}>
            <Row justify="space-between" align="middle" style={{ height: '100%', padding: '0 16px' }}>
                {isMobile && (
                    <Col>
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={onMenuClick}
                            style={{
                                color: '#fff',
                                fontSize: '20px',
                                padding: 0,
                                height: 'auto'
                            }}
                        />
                    </Col>
                )}
                <Col style={{ marginLeft: 'auto' }}>
                    <Space size={isMobile ? 'middle' : 'large'}>
                        <Badge count={5}>
                            <ShoppingCartOutlined style={{color: '#fff', fontSize: isMobile ? 20 : 24 }} />
                        </Badge>
                        <UserOutlined style={{color: '#fff', fontSize: isMobile ? 20 : 24 }} />
                    </Space>
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;
