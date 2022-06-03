import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }) => <ThemeProvider enableSystem={true} attribute="class"><Component {...pageProps} /></ThemeProvider>

export default App
