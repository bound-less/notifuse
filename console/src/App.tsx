import { ConfigProvider, App as AntApp, ThemeConfig, theme as antdTheme } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { initializeAnalytics } from './utils/analytics-config'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

const getLightTheme = (): ThemeConfig => ({
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#7763F1',
    colorLink: '#7763F1',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgLayout: 'rgb(243, 246, 252)',
    colorText: '#171717',
    colorTextSecondary: '#595959',
    colorBorder: '#f0f0f0',
    colorBorderSecondary: '#e0e0e0'
  },
  components: {
    Layout: {
      bodyBg: '#ffffff',
      lightSiderBg: '#fdfdfd',
      siderBg: '#fdfdfd',
      headerBg: '#ffffff'
    },
    Card: {
      headerFontSize: 16,
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      borderRadiusXS: 4
    },
    Table: {
      headerBg: 'transparent',
      fontSize: 12,
      colorTextHeading: 'rgb(51 65 85)'
    },
    Menu: {
      itemBg: '#fdfdfd',
      subMenuItemBg: '#fdfdfd'
    }
  }
})

const getDarkTheme = (): ThemeConfig => ({
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#8b7af7',
    colorLink: '#8b9eff',
    colorBgBase: '#1a1a1a',
    colorBgContainer: '#1a1a1a',
    colorBgLayout: '#0f0f0f',
    colorText: '#e5e5e5',
    colorTextSecondary: '#a0a0a0',
    colorBorder: '#2a2a2a',
    colorBorderSecondary: '#3a3a3a'
  },
  components: {
    Layout: {
      bodyBg: '#1a1a1a',
      lightSiderBg: '#161616',
      siderBg: '#161616',
      headerBg: '#1a1a1a'
    },
    Card: {
      headerFontSize: 16,
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      borderRadiusXS: 4
    },
    Table: {
      headerBg: 'transparent',
      fontSize: 12
    },
    Menu: {
      itemBg: '#161616',
      subMenuItemBg: '#161616'
    }
  }
})

// Initialize analytics service
initializeAnalytics()

function AppContent() {
  const { theme } = useTheme()
  const antdThemeConfig = theme === 'dark' ? getDarkTheme() : getLightTheme()

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  )
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
