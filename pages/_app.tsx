import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import ModalDim from '../components/common/modalDim'
import LoadingDim from '../components/common/overlay/loadingDim'
import Toast from '../components/common/overlay/toast'
import Alert from '../components/common/overlay/alert'
import { LoginBox } from '../components/common/accountPopup'
import { SettingBox } from '../components/common/settingPopup'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <RecoilRoot>
                <Component {...pageProps} />
                <>
                    <LoginBox />
                    <SettingBox />
                    <Toast />
                    <Alert />
                    <LoadingDim />
                    <ModalDim />
                </>
            </RecoilRoot>
        </>
    )
}

export default MyApp
