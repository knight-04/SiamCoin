import React from 'react';
import { Tag, Typography, Image, Space, Button, Modal } from 'antd';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';

const { Title } = Typography;

const NewsDetail = ({ news, visible, onClose }) => {
    if (!news) return null;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div style={{ padding: '20px 0' }}>
                <Tag color="orange" style={{ marginBottom: 16 }}>
                    {news.type}
                </Tag>
                <Title level={4}>{news.title}</Title>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Image
                        preview={false}
                        src={news.image}
                        alt={news.title}
                        style={{ width: '100%', borderRadius: 8 }}
                    />
                    <Space direction="vertical">
                        <Space>
                            <CalendarOutlined />
                            {news.date} {news.time}
                        </Space>
                        <Space>
                            <TeamOutlined />
                            {news.location}
                        </Space>
                    </Space>
                    <div style={{ color: '#666' }}>
                        {news.description}
                    </div>
                </Space>
            </div>
        </Modal>
    );
};

export default NewsDetail;