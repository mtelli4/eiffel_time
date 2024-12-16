import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppRoutes } from './routes'

export default function App() {
    const user: {
        role: 'admin' | 'student' | 'teacher' | 'secretary' | 'manager'
    } = {
        role: 'admin',
    }
    return (
        <BrowserRouter>
            <Layout userRole={user.role}>
                <AppRoutes />
            </Layout>
        </BrowserRouter>
    )
}
