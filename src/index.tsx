import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { Liff } from '@line/liff'
import { LiffMockPlugin } from '@line/liff-mock';

const LiffContext = createContext<{
    liff?: Liff
}>({})

export const useLiff = () => useContext(LiffContext)

export const LiffProvider: FC<PropsWithChildren<{
    liffId: string;
    mock?: {
        enable: boolean;
        plugin?: LiffMockPlugin;
        mockDidLoaded?: (parameter?: any) => {[method: string]: any}
    }
}>> = ({children, liffId, mock}) => {
    const didLoadRef = useRef(false)
    const [_liff, setLiffSDK] = useState<Liff | undefined>()
    const [liff, setLiff] = useState<Liff | undefined>()
    // Load LIFF SDK
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (didLoadRef.current === true) return;
        didLoadRef.current = true
        import('@line/liff')
        .then((data: any) => setLiffSDK(data))
    }, [])
    // init Liff
    useEffect(() => {
        if (!_liff) return;
        if (mock?.enable) {
            _liff.use(mock?.plugin ?? new LiffMockPlugin())
        }
        _liff.init({
            liffId,
            mock: mock?.enable ?? false
        } as any).then(() => {
            if (mock?.mockDidLoaded) {
                (_liff as any).$mock.set(mock.mockDidLoaded)
            }
            setLiff(_liff)
        })
    }, [_liff, mock, liffId])
    return (
        <LiffContext.Provider
            value={{
                liff,
            }}
        >
            {children}
        </LiffContext.Provider>
    )
}