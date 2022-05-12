import React from 'react';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Liff } from '@line/liff';

const LiffContext = createContext<{
  liff?: Liff;
}>({});

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren<{
  liffId: string;
}>> = ({ children, liffId }) => {
  const didLoadRef = useRef(false);
  const [liff, setLiff] = useState<Liff | undefined>();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (didLoadRef.current === true) return;
    didLoadRef.current = true;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    import('@line/liff').then((data: any) => {
      data.init({ liffId }).then(() => setLiff(data));
    });
  }, [liffId]);
  return (
    <LiffContext.Provider
      value={{
        liff,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
