# use-liff

## Getting started

### Install

```bash
$ npm i use-liff
```

### Setup Provider

```jsx
import { LiffProvider } from 'use-liff'

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
import { useLiff } from 'use-liff'

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