/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useHello } from '../hooks/hello'
import { useUpload } from '../hooks/upload'
import { ReactEventHandler, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const { upload } = useUpload()
  const { sayHello } = useHello()
  const [message, setMessage] = useState('-')
  const [name, setName] = useState('World')

  const onSubmitEcho: ReactEventHandler = async (e) => {
    e.preventDefault()
    setMessage(await sayHello(name))
  }

  const [ uploadDisabled, setUploadDisabled ] = useState(true)
  const [ uploadName, setUploadName ] = useState('')
  const [ uploadSize, setUploadSize ] = useState(0)
  const [ uploadData, setUploadData ] = useState('')

  const onChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUploadDisabled(true)
    const file = e.target.files ? e.target.files[0] : null
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      setUploadName(file.name)
      setUploadSize(file.size)
      setUploadData((reader.result as string).split(',')[1])
      setUploadDisabled(false)
    });
  }

  const onSubmitUpload: ReactEventHandler = async (e) => {
    e.preventDefault()
    await upload(uploadName, uploadSize, uploadData)
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
          <h2>Echo</h2>
          <form onSubmit={onSubmitEcho}>
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

        <div className={styles.description}>
          <h2>File Uploader</h2>
          <form onSubmit={onSubmitUpload}>
            <dl>
              <dt>REQUEST</dt>
              <dd><input type="file" onChange={onChangeFileInput}></input></dd>
            </dl>
            <dl>
              <dt>RESPONSE</dt>
              <dd>{uploadName}</dd>
              <dd>{uploadData.substr(0, 16)}...</dd>
            </dl>
            <input type="submit" disabled={uploadDisabled}></input>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
