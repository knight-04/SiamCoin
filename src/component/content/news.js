import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Typography, Image, Space, Divider } from 'antd';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { newsData } from '../mock data/data';
import NewsDetail from '../modal/news_detail';

const { Text, Title } = Typography;

const NewsActivities = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>ข่าวสารและประชาสัมพันธ์</Title>
                </div>
            }
            bodyStyle={{
                height: isMobile ? null : 500,
            }}
        >
            <List
                itemLayout={isMobile ? "vertical" : "horizontal"} 
                dataSource={newsData}
                pagination={{
                    pageSize: 2,
                    size: 'default',
                    style: { textAlign: 'center', marginTop: '16px' }
                }}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedNews(item)}
                    >
                        <List.Item.Meta
                            avatar={
                                !isMobile ? (
                                    <Image
                                        preview={false}
                                        width={200}
                                        height={'auto'}
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            borderRadius: 8,
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : null
                            }
                            title={
                                <div>
                                    {isMobile && (
                                        <Image
                                        preview={false}
                                            width="100%"
                                            height={200}
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                borderRadius: 8,
                                                objectFit: 'cover',
                                                marginBottom: 16
                                            }}
                                        />
                                    )}
                                    <Tag color="orange" style={{ marginTop: 8 }}>
                                        {item.type}
                                    </Tag>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        display: 'block',
                                        marginTop: 8
                                    }}>
                                        {item.title}
                                    </Text>
                                </div>
                            }
                            description={
                                <>
                                    {item.description && (
                                        <div style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            color: '#666',
                                            marginTop: 8,
                                            marginBottom: 8
                                        }}>
                                            {item.description}
                                        </div>
                                    )}
                                    <Space split={<Divider type="vertical" />}>
                                        <Space>
                                            <CalendarOutlined />
                                            {item.date} {item.time}
                                        </Space>
                                        <Space>
                                            <TeamOutlined />
                                            {item.location}
                                        </Space>
                                    </Space>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />

            <NewsDetail
                news={selectedNews}
                visible={!!selectedNews}
                onClose={() => setSelectedNews(null)}
            />
        </Card>
    );
};

export default NewsActivities;