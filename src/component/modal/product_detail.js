import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Space, Button, Tag, Rate, Typography, InputNumber, Divider, Image, notification, Tooltip, Radio, Slider } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, RotateLeftOutlined, RotateRightOutlined, SyncOutlined, ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

const AmuletMagnifier = ({
    src,
    alt,
    initialMagnification = 2.5,
    initialGlassSize = 150
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showGlass, setShowGlass] = useState(false);
    const [magnification, setMagnification] = useState(initialMagnification);
    const [glassSize, setGlassSize] = useState(initialGlassSize);
    const [rotation, setRotation] = useState(0);
    const [lightingMode, setLightingMode] = useState('normal');
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    const handleRotate = (direction) => {
        setRotation(prev => prev + (direction === 'left' ? -90 : 90));
    };

    const getLightingFilter = () => {
        switch (lightingMode) {
            case 'bright':
                return 'brightness(120%) contrast(110%)';
            case 'dark':
                return 'brightness(90%) contrast(120%)';
            case 'sharp':
                return 'brightness(100%) contrast(130%) saturate(110%)';
            default:
                return 'none';
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current || !imageRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.pageX - rect.left - window.scrollX;
            const y = e.pageY - rect.top - window.scrollY;
            setPosition({
                x: Math.min(Math.max(0, x), rect.width),
                y: Math.min(Math.max(0, y), rect.height)
            });
        };

        const element = containerRef.current;
        if (element) {
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseenter', () => setShowGlass(true));
            element.addEventListener('mouseleave', () => setShowGlass(false));
        }

        return () => {
            if (element) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseenter', () => setShowGlass(true));
                element.removeEventListener('mouseleave', () => setShowGlass(false));
            }
        };
    }, []);

    return (
        <div >
            <div className="flex justify-between items-center mb-4">
                <Space>
                    <Tooltip title="หมุนซ้าย">
                        <Button type='text'
                            icon={<RotateLeftOutlined />}
                            onClick={() => handleRotate('left')}
                        />
                    </Tooltip>
                    <Tooltip title="หมุนขวา">
                        <Button type='text'
                            icon={<RotateRightOutlined />}
                            onClick={() => handleRotate('right')}
                        />
                    </Tooltip>
                    <Tooltip title="รีเซ็ตมุมมอง">
                        <Button type='text'
                            icon={<SyncOutlined />}
                            onClick={() => {
                                setRotation(0);
                                setMagnification(initialMagnification);
                            }}
                        />
                    </Tooltip>
                </Space>
                <Space>
                    <Radio.Group style={{ marginLeft: 70, marginBottom: 10 }}
                        value={lightingMode}
                        onChange={(e) => setLightingMode(e.target.value)}
                        buttonStyle="solid"
                    >
                        <Tooltip title="แสงปกติ">
                            <Radio.Button value="normal">ปกติ</Radio.Button>
                        </Tooltip>
                        <Tooltip title="เพิ่มความสว่าง">
                            <Radio.Button value="bright">สว่าง</Radio.Button>
                        </Tooltip>
                        <Tooltip title="เพิ่มความคมชัด">
                            <Radio.Button value="sharp">คมชัด</Radio.Button>
                        </Tooltip>
                        <Tooltip title="ลดแสง">
                            <Radio.Button value="dark">มืด</Radio.Button>
                        </Tooltip>
                    </Radio.Group>
                </Space>
            </div>

            <div
                ref={containerRef}
                className="relative"
                style={{
                    width: '100%',
                    borderRadius: 8,
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0'
                }}
            >
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        display: 'block',
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 0.3s ease',
                        filter: getLightingFilter()
                    }}
                />
                {showGlass && (
                    <div
                        style={{
                            position: 'absolute',
                            width: `${glassSize}px`,
                            height: `${glassSize}px`,
                            left: position.x - glassSize / 2,
                            top: position.y - glassSize / 2,
                            border: '2px solid #f0f0f0',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            pointerEvents: 'none',
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            zIndex: 10
                        }}
                    >
                        <img
                            src={src}
                            alt={`Magnified ${alt}`}
                            style={{
                                position: 'absolute',
                                width: `${imageRef.current?.offsetWidth * magnification}px`,
                                height: `${imageRef.current?.offsetHeight * magnification}px`,
                                left: `${-(position.x * magnification - glassSize / 2)}px`,
                                top: `${-(position.y * magnification - glassSize / 2)}px`,
                                transform: `rotate(${rotation}deg)`,
                                filter: getLightingFilter()
                            }}
                        />
                    </div>
                )}
            </div>




            <Space style={{ margin: '16px' }}>
                <Tooltip title="ลดการขยาย">
                    <Button
                        icon={<ZoomOutOutlined />}
                        onClick={() => setMagnification(prev => Math.max(1.5, prev - 0.5))}
                    />
                </Tooltip>
                <Slider
                    value={magnification}
                    min={1.5}
                    max={4}
                    step={0.1}
                    style={{ width: 300 }}
                    onChange={setMagnification}
                />
                <Tooltip title="เพิ่มการขยาย">
                    <Button
                        icon={<ZoomInOutlined />}
                        onClick={() => setMagnification(prev => Math.min(4, prev + 0.5))}
                    />
                </Tooltip>
            </Space>


        </div>
    );
};


const ProductDetail = ({ product, visible, onClose }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!product) return null;

    const handleQuantityChange = (value) => {
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        notification.success({
            message: 'เพิ่มในตะกร้าแล้ว',
            description: `เพิ่ม ${product.name} จำนวน ${quantity} ชิ้น ในตะกร้าแล้ว`,
        });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={isMobile ? '100%' : 1000}
            style={{
                top: isMobile ? 'auto' : 50,
                bottom: isMobile ? 0 : 'auto',
                padding: 0,
                maxWidth: '100vw'
            }}
            bodyStyle={{
                padding: isMobile ? '16px' : '24px',
                maxHeight: isMobile ? '90vh' : 'auto',
                overflowY: 'auto',
                msOverflowStyle: '-ms-autohiding-scrollbar',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            <Row gutter={[48, 48]}>
                <Col xs={24} md={12}>
                    {isMobile ? (
                        <Image
                            preview={true}
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                    ) : (
                        <AmuletMagnifier
                            src={product.image}
                            alt={product.name}
                        />
                    )}
                </Col>
                <Col xs={24} md={12}>
                    <Space direction="vertical" size="large" >
                        <div>
                            <Title level={isMobile ? 5 : 4}>{product.name}</Title>
                            {product.discount && (
                                <Tag color="red">-{product.discount}%</Tag>
                            )}
                        </div>

                        <Space>
                            <Rate disabled defaultValue={product.rating} />
                            <Text type="secondary">ขายแล้ว {product.sold} ชิ้น</Text>
                        </Space>

                        <div>
                            <Text type="danger" style={{ fontSize: isMobile ? 20 : 24, fontWeight: 'bold' }}>
                                ฿{(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
                            </Text>
                            {product.originalPrice && (
                                <Text delete type="secondary" style={{ marginLeft: 8 }}>
                                    ฿{product.originalPrice.toLocaleString()}
                                </Text>
                            )}
                        </div>

                        <Paragraph>{product.description}</Paragraph>

                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div>
                                <Text strong>จำนวน</Text>
                                <Space style={{ marginLeft: 16 }}>
                                    <Button
                                        icon={<MinusOutlined />}
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= 1}
                                        size={isMobile ? 'small' : 'middle'}
                                    />
                                    <InputNumber
                                        min={1}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        style={{ width: isMobile ? 50 : 60 }}
                                        size={isMobile ? 'small' : 'middle'}
                                    />
                                    <Button
                                        icon={<PlusOutlined />}
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        size={isMobile ? 'small' : 'middle'}
                                    />
                                </Space>
                            </div>

                            <div>
                                <Text strong>สินค้าคงเหลือ: </Text>
                                <Text type="secondary">{product.stock || 'ไม่ระบุ'}</Text>
                            </div>
                        </Space>

                        <Divider style={{ margin: isMobile ? '8px 0' : '12px 0' }} />

                        <div>
                            <Text strong>ราคารวม: </Text>
                            <Text type="danger" strong style={{ fontSize: isMobile ? 18 : 20 }}>
                                ฿{((product.price * (1 - (product.discount || 0) / 100)) * quantity).toLocaleString()}
                            </Text>
                        </div>

                        <Space size="middle" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                icon={<ShoppingCartOutlined />}
                                onClick={handleAddToCart}
                                size={isMobile ? 'middle' : 'large'}
                                style={{ flex: 1 }}
                            >
                                เพิ่มในตะกร้า
                            </Button>
                            <Button
                                type="primary"
                                danger
                                size={isMobile ? 'middle' : 'large'}
                                style={{ flex: 1 }}
                            >
                                ซื้อทันที
                            </Button>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductDetail;