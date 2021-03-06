# use-line-liff

## Getting started

### Install

```bash
$ npm i use-line-liff
```

### Setup Provider

```jsx
import { LiffProvider } from 'use-line-liff'

function MyApp({ children }) {
  return (
    <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID}>
      {children}
    </LiffProvider>
  )
}

export default MyApp
```

### Use React Hook


```jsx
import { useEffect } from 'react'
import { useLiff } from 'use-line-liff'

const Home = () => {
  const { liff } = useLiff()
  useEffect(() => {
    if (!liff) return;
    if (!liff.isLoggedIn()) {
      liff.login()
    }
    liff.getProfile()
      .then(profile => {
        console.log(profile)
      })
  },[liff])
  return (
    <div>
      <main>
        <h1>Hello liff</h1>
      </main>
    </div>
  )
}

export default Home
```

## Usage

### Mock

Enabled `@line/liff-mock` plugin.

```jsx
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiffProvider
      liffId={process.env.NEXT_PUBLIC_LIFF_ID as string}
      mock={{
        enable: true
      }}
    >
      <Component {...pageProps} />
    </LiffProvider>
  )
}
```

Return custom value.

```jsx
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiffProvider
      liffId={process.env.NEXT_PUBLIC_LIFF_ID as string}
      mock={{
        enable: true,
        mockDidLoaded: (p) => {
          return {
            ...p,
            getProfile: {
                ...p.getProfile,
                userId: 'custom-user-id'
            }
          }
        }
      }}
    >
    <Component {...pageProps} />
    </LiffProvider>
  )
}
```