import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined,
  WechatOutlined 
} from '@ant-design/icons';
import LOGO from '../../image/siamcoin_logo-original.png';

const { Text, Title } = Typography;

const ContactInfo = () => {
  const iconStyle = {
    fontSize: '16px',
    color: '#e65f2b'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  };
  

  return (
    <Card style={{backgroundColor: '#1d3a34', minHeight: 300, marginTop: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space size="middle">
              <img 
                src={LOGO} 
                alt="SIAMCOIN Logo" 
                style={{ width: 64, height: 64 }}
              />
              <Title level={3} style={{ margin: 0, color: '#fff' }}>SIAM COIN</Title>
            </Space>
 
            <div style={contactItemStyle}>
              <EnvironmentOutlined style={iconStyle} />
              <Text style={{color: '#fff', fontSize: '10px'}}> 
                19 Soi Anamaingamcharean 25 Thakam Bangkhuntien Bangkok 10150
              </Text>
            </div>
       
            <div style={contactItemStyle}>
              <PhoneOutlined style={iconStyle} />
              <Text style={{color: '#fff', fontSize: '10px'}}> 098-3636-515</Text>
            </div>

      
            <div style={contactItemStyle}>
              <WechatOutlined style={iconStyle} />
              <Text style={{color: '#fff', fontSize: '10px'}}> LINE@ : @siamcoin</Text>
            </div>

  
            <div style={contactItemStyle}>
              <MailOutlined style={iconStyle} />
              <Text style={{color: '#fff', fontSize: '10px'}}> siamcoinantique@gmail.com</Text>
            </div>


            <div style={contactItemStyle}>
              <ClockCircleOutlined style={iconStyle} />
              <Text style={{color: '#fff', fontSize: '10px'}}> 9.00-17.00</Text>
            </div>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}> {/* ปรับความสูงแผนที่ */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7612886741865!2d100.5944!3d13.7323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzU2LjMiTiAxMDDCsDM1JzM5LjgiRQ!5e0!3m2!1sen!2sth!4v1639458065275!5m2!1sen!2sth"
              style={{ 
                border: 0,
                width: '100%',
                height: '100%'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactInfo;