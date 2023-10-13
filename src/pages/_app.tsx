import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  return <div className={inter.className}>
           <ReduxProvider>
             <Component {...pageProps} />
           </ReduxProvider>
         </div>
}


export default appWithTranslation(App)
