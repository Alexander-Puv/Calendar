import { Card, Layout, Row } from 'antd'
import React, {FC} from 'react'
import { LoginForm } from '../components/LoginForm'

export const Login: FC = () => {
    return (
        <Layout>
            <Row justify='center' align='middle' className='main'>
                <Card style={{background: '#141414', border: '1px solid #434343', boxShadow: '10px 10px 15px black'}}>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    )
}
