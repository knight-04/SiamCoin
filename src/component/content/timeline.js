import React, { useState, useEffect } from 'react';
import { Timeline, Typography, Card, Segmented, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { timeline } from '../mock data/data';

const { Title, Text } = Typography;

const HistoryTimeline = ({ data }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const filteredData = activeTab === 'all'
        ? timeline
        : timeline.filter((data) => {
            const currentDate = dayjs();
            const itemDate = dayjs(data.date);
            return activeTab === 'lastMonth'
                ? itemDate.isSame(currentDate.subtract(1, 'month'), 'month')
                : itemDate.isSame(currentDate, 'month');
        });

    const options = isMobile
        ? [
            { label: 'ทั้งหมด', value: 'all' },
            { label: 'เดือนนี้', value: 'thisMonth' },
        ]
        : [
            { label: 'ทั้งหมด', value: 'all' },
            { label: 'เดือนที่แล้ว', value: 'lastMonth' },
            { label: 'เดือนนี้', value: 'thisMonth' },
        ];


    return (
        <div style={{ marginTop: '24px' }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={4} style={{ margin: 0 }}>กิจกรรมล่าสุด</Title>
                    </div>
                }
                style={{ height : 500 }}
                bordered={false}
                bodyStyle={{ padding: '24px' }}
            >
                <Segmented
                    style={{ marginTop: '5px' }}
                    options={options}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value)}
                    block
                    size="large"
                />
                <div style={{ overflowX: 'auto' }}>
                    <Timeline
                        mode="left"
                        items={filteredData.map((data) => ({
                            dot: <div style={{
                                width: 16,
                                height: 16,
                                background: '#B8860B',
                                borderRadius: '50%',
                            }} />,
                            style: { minWidth: 300, margin: '16px' },
                            children: (
                                <div style={{ padding: '0 20px' }}>
                                    <Title level={4} style={{ marginBottom: 24 }}>
                                        {dayjs(data.date).format('D MMMM YYYY')}
                                    </Title>
                                    {data.items.map((item, itemIndex) => (
                                        <div key={itemIndex} style={{ marginBottom: 30 }}>
                                            <Row gutter={[24, 24]}>
                                                <Col xs={24} md={24}>
                                                    <Text strong>{item.title}</Text>
                                                    <br />
                                                    <Text type="secondary">{item.detail}</Text>
                                                </Col>
                                                {/* <Col xs={24} md={8}>
                                                    <Button
                                                        type="default"
                                                        onClick={() => openActivityModal(item)}
                                                    >
                                                        <EyeOutlined /> อ่านต่อ
                                                    </Button>
                                                </Col> */}
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            ),
                        }))}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default HistoryTimeline;
