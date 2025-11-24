import { PlusOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { ReactNode } from 'react'

const { Content } = Layout

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/splash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Content style={{ padding: '24px' }}>{children}</Content>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.125rem',
          fontSize: '9px'
        }}
      >
        <a
          href="https://unsplash.com/fr/@zetong"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#a0a0a0', textDecoration: 'none' }}
        >
          Photo by Zetong Li
        </a>
      </div>
    </Layout>
  )
}

interface MainLayoutSidebarProps {
  children: ReactNode
  title: string
  extra: ReactNode
}

export function MainLayoutSidebar({ children, title, extra }: MainLayoutSidebarProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '400px',
        padding: '1.5rem',
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderLeft: '1px solid rgba(0, 0, 0, 0.06)',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        {extra}
      </div>
      {children}
    </div>
  )
}
