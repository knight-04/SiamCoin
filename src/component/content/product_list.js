import React, { useState } from 'react';
import { Layout, Card, Row, Col, Input, Space, Typography, Tag, Rate, Tabs,Badge, Avatar} from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { categories, product } from '../mock data/data';
import ProductDetail from '../modal/product_detail';

const { Content } = Layout;
const { Text } = Typography;
const { Search } = Input;
const { Meta } = Card;

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const filteredProducts = product.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleFavorite = (productId, e) => {
        e.stopPropagation();
        setFavorites(favorites.includes(productId)
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId]
        );
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    const items = [
        { key: 'all', label: 'ทั้งหมด' },
        ...categories.map(cat => ({
            key: cat.name,
            label: cat.name,
            icon: <Avatar size="small" src={cat.image} style={{ marginRight: 8 }} />
        }))
    ];

    return (
        <Content style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
                <Search
                    placeholder="ค้นหาสินค้า..."
                    allowClear
                    enterButton
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ maxWidth: 600 }}
                />
            </div>

            <Tabs
                items={items}
                activeKey={selectedCategory}
                onChange={setSelectedCategory}
                size="large"
                style={{ marginBottom: 24 }}
                type="card"
            />

            <Row gutter={[16, 16]}>
                {filteredProducts.map(item => (
                    <Col xs={24} sm={12} md={8} lg={4} key={item.id}>
                        <Badge.Ribbon 
                            text={`-${item.discount}%`} 
                            color="red"
                            style={{ display: item.discount ? 'block' : 'none' }}
                        >
                            <Card
                                hoverable
                                onClick={() => handleProductClick(item)}
                                cover={
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <img
                                            alt={item.name}
                                            src={item.image}
                                            style={{ 
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                }
                                actions={[
                                    favorites.includes(item.id) ? 
                                        <HeartFilled 
                                            key="heart" 
                                            style={{ color: '#ff4d4f' }}
                                            onClick={(e) => handleFavorite(item.id, e)}
                                        /> :
                                        <HeartOutlined 
                                            key="heart"
                                            onClick={(e) => handleFavorite(item.id, e)}
                                        />,
                                    <ShoppingCartOutlined key="cart" onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(item);
                                    }}/>
                                ]}
                            >
                                <Meta
                                    title={
                                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                            <Text ellipsis style={{ width: '100%' }}>
                                                {item.name}
                                            </Text>
                                            <Space>
                                                <Text type="danger" strong>
                                                    ฿{(item.price * (1 - (item.discount || 0) / 100)).toLocaleString()}
                                                </Text>
                                                {item.originalPrice && (
                                                    <Text delete type="secondary">
                                                        ฿{item.originalPrice.toLocaleString()}
                                                    </Text>
                                                )}
                                            </Space>
                                        </Space>
                                    }
                                    description={
                                        <Space direction="vertical" size={4}>
                                            <Space>
                                                <Rate disabled defaultValue={4} style={{ fontSize: 12 }} />
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    ({item.sold})
                                                </Text>
                                            </Space>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                ขายแล้ว {item.sold} ชิ้น
                                            </Text>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>

            <ProductDetail 
                product={selectedProduct}
                visible={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </Content>
    );
};

export default ProductList;