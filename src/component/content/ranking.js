import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Rate, List, Segmented } from 'antd';
import ProductDetail from '../modal/product_detail';
import { product } from '../mock data/data';

const { Title, Text } = Typography;

const Products = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const options = [
        { value: '1', label: 'เหรียญ' },
        { value: '2', label: 'เครื่องราง' },
        { value: '3', label: 'พระบูชา' },
        { value: '4', label: 'หนังสือ' },
    ];

    const filteredProducts = React.useMemo(() => {
        switch (activeTab) {
            case '1':
                return product.filter(item => item.category === 'เหรียญ');
            case '2':
                return product.filter(item => item.category === 'เครื่องราง');
            case '3':
                return product.filter(item => item.category === 'พระบูชา');
            case '4':
                return product.filter(item => item.category === 'หนังสือ');
            default:
                return product;
        }
    }, [activeTab, product]);

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>สินค้าขายดีประจำสัปดาห์</Title>
                </div>
            }
            bordered={false}
            bodyStyle={{ padding: '12px'}}
            style={{minHeight:isMobile? null : 1000}}
        >
            <Segmented
                options={options}
                value={activeTab}
                onChange={(value) => setActiveTab(value)}
                block
                size="large"
                style={{ marginBottom: '12px' }}
            />

            <List
                itemLayout="horizontal"
                dataSource={filteredProducts}
                pagination={{
                    pageSize: 5,
                    size: 'default',
                    style: { textAlign: 'center', marginTop: '16px' }
                }}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={() => setSelectedProduct(item)}
                        style={{ 
                            cursor: 'pointer',
                            padding: '12px',
                            background: '#fff',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            border: '1px solid #f0f0f0'
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <div style={{ position: 'relative' }}>
                                    {index < 3 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: -4,
                                            left: -4,
                                            background: '#ff4d4f',
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            zIndex: 1
                                        }}>
                                            TOP {index + 1}
                                        </div>
                                    )}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>
                            }
                            title={
                                <Space direction="vertical" size={2}>
                                    <Tag color="orange" style={{ marginRight: 0 }}>
                                        ยอดขายต่อเดือน: {item.sold}
                                    </Tag>
                                    <Text strong>{item.name}</Text>
                                </Space>
                            }
                            description={
                                <Space direction="vertical" size={2}>
                                    <Space>
                                        <Text type="danger" strong>฿{item.price}</Text>
                                        {item.originalPrice && (
                                            <Text delete type="secondary">
                                                ฿{item.originalPrice}
                                            </Text>
                                        )}
                                    </Space>
                                    <div>
                                        <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                                        <Text type="secondary" style={{ marginLeft: 8 }}>
                                            {item.rating}/5 ({item.reviews} รีวิว)
                                        </Text>
                                    </div>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />

            <ProductDetail
                product={selectedProduct}
                visible={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </Card>
    );
};

export default Products;