import { React, useState, useEffect } from 'react';
import {
    Layout,
    Card,
    Button,
    Typography,
    Row,
    Col,
    Space,
    Carousel
} from 'antd';
import AppSider from '../../component/sider/sider';
import AppHeader from '../../component/header/header';
import Timeline from '../../component/content/timeline';
import Ranking from '../../component/content/ranking';
import Img from '../../image/2-4-scaled.webp';
import NewsActivities from '../../component/content/news';
import Address from '../../component/content/address'
import LOGO from '../../image/siamcoin_logo-original.png';

const { Content } = Layout;
const { Title, Text } = Typography;

const MainPage = () => {
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

    const banners = [
        { src: Img },
        { src: Img },

    ];

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


                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                            <Col xs={24} lg={24}>
                                <Card
                                    style={{
                                        background: '#1d3a34',
                                        marginBottom: 24,
                                        borderRadius: 8
                                    }}
                                >
                                    <Row align="middle" justify="space-between">
                                        <Col xs={24} md={6}>
                                            <Space direction='horizontal' size='large' style={{ marginBottom: '10px' }}>
                                                <img
                                                    src={LOGO}
                                                    style={{ maxWidth: isMobile ? '70px' : '50px', minHeight: 'auto' }}
                                                />
                                                <Title level={2} style={{ color: 'white', marginTop: 10 }}>
                                                    SIAM COIN
                                                </Title>

                                            </Space>
                                            <Text style={{ color: 'white', display: 'block', marginBottom: 24 }}>
                                                ยินดีต้อนรับเข้าสู่ แหล่งสินค้าคุณภาพ เช่น เหรียญ พระเครื่อง พระบูชา และอื่นๆ มากมาย
                                            </Text>
                                            <Button type="primary" ghost style={{ borderColor: 'white', color: 'white' }}>
                                                สมัครสมาชิก
                                            </Button>
                                        </Col>
                                        <Col xs={24} md={16} style={{ textAlign: 'center' }}>
                                            <Carousel autoplay style={{ marginTop: isMobile ? '16px' : null }}>
                                                {banners.map((banner, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={Img}
                                                            alt="Upgrade"
                                                            style={{ maxWidth: isMobile ? '320px' : '700px', minHeight: 'auto', borderRadius: '8px' }}
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xs={24} lg={24}>
                                <NewsActivities />
                                <Timeline />
                            </Col>
                        </Col>
                        <Col xs={24} md={8}>
                            <Ranking />
                            <Address />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainPage;