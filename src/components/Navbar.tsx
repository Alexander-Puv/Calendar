import { Button, Row, Typography } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RouteNames } from './AppRouter'
import { useActions } from '../hooks/useActions'

export const Navbar: FC = () => {
    const link = useNavigate();
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()

    return (
        <Header>
            <Row justify='space-between' align="middle" style={{height: '100%'}}>
                <Typography.Title level={1} style={{margin: 0, color: 'white'}}>Calendar</Typography.Title>
                {isAuth ?
                    <Row align="middle" style={{gap: 10}}>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Button type="primary" onClick={() => logout()}>Log out</Button>
                    </Row>
                :
                    <Button type="primary" onClick={() => link(RouteNames.LOGIN)}>Log in</Button>
                }
            </Row>
        </Header>
    )
}
