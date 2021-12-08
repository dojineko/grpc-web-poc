/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useHello } from '../hooks/hello'
import { ReactEventHandler, useCallback, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const { sayHello } = useHello()
  const [message, setMessage] = useState('-')
  const [name, setName] = useState('World')

  const onSubmit: ReactEventHandler = async (e) => {
    e.preventDefault()
    setMessage(await sayHello(name))
  }

  useEffect(() => {
    (async ()=> {
      setMessage(await sayHello(name))
    })()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>gRPC-WEB SAMPLE APP</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to gRPC-WEB
        </h1>

        <div className={styles.description}>
          <form onSubmit={onSubmit}>
            <dl>
              <dt>REQUEST</dt>
              <dd><input value={name} onChange={ (e) => { setName(e.target.value) }}></input></dd>
            </dl>
            <dl>
              <dt>RESPONSE</dt>
              <dd>{message}</dd>
            </dl>
            <input type="submit"></input>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
