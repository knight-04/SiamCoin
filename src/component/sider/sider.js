import React from 'react';
import { Layout, Menu, Button, Drawer } from 'antd'; // เพิ่ม Drawer
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HomeOutlined,
    PartitionOutlined,
    ShoppingOutlined,
    CaretLeftOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
import LOGO from '../../image/siamcoin_logo-original.png';
import './sider.css';

const { Sider } = Layout;

const AppSider = ({ collapsed, onCollapse, drawerVisible, setDrawerVisible, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { 
            key: "main", 
            icon: <HomeOutlined />, 
            label: "หน้าแรก",
            onClick: () => {
                navigate('/main');
                setDrawerVisible(false);
            }
        },
        { 
            key: "product", 
            icon: <ShoppingOutlined />, 
            label: "สินค้า",
            onClick: () => {
                navigate('/product');
                setDrawerVisible(false);
            }
        },
        { 
            key: "form", 
            icon: <PartitionOutlined />, 
            label: "แผนการทำงาน",
            onClick: () => {
                navigate('/form');
                setDrawerVisible(false);
            }
        }
    ];

    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={250}
                bodyStyle={{ padding: 0, backgroundColor: '#1d3a34' }}
                headerStyle={{ display: 'none' }}
            >
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <img
                        src={LOGO}
                        alt="Logo"
                        style={{
                            width:  '80px',
                            height: '80px',
                            borderRadius: '50%'
                        }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[1] || 'main']}
                    items={menuItems}
                    style={{ 
                        backgroundColor: 'transparent',
                        borderRight: 'none'
                    }}
                    className="custom-menu"
                />
            </Drawer>
        );
    }


    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 2,
                backgroundColor: '#1d3a34'
            }}
            collapsedWidth={80}
            trigger={
                <div style={{ 
                    backgroundColor: '#e65f2b',
                    color: '#ffffff',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    {collapsed ? <CaretRightOutlined /> : <div><CaretLeftOutlined /> ลดขนาด</div>}
                </div>
            }
        >
            <div style={{
                height: 64,
                margin: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={LOGO}
                    alt="Siamcoin Logo"
                    style={{
                        padding: '10px',
                        height:collapsed ? '70px' : '100px',
                        width: collapsed ? 'auto': 'auto',
                    }}
                />
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname.split('/')[1] || 'main']}
                items={menuItems}
                style={{ 
                    backgroundColor: 'transparent',
                    borderRight: 'none'
                }}
                className="custom-menu" 
            />
        </Sider>
    );
};

export default AppSider;

