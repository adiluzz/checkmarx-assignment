import Head from 'next/head';
import { useState } from 'react';
import { ResponseData } from '../services/data.interface';
import styles from '../styles/Home.module.css';

export default function Home() {

  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();
  const [result, setResult] = useState<ResponseData>();

  const getMonthData = async () => {
    const res = await fetch(`api/data/${year}/${month}`);
    const data = await res.json();
    setResult(data);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Checkmarx home assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.form}>
        <h2>
          Select Month
        </h2>
        <input
          type='month'
          className={styles['date-input']}
          onChange={(ev) => {
            setMonth(ev.target.value.split('-')[1]);
            setYear(ev.target.value.split('-')[0]);
          }}
        />
        <button className={styles['get-data-button']} disabled={!month} onClick={getMonthData}>Get Data</button>
      </div>
      {
        result &&
        <div className={styles.result}>
          {result.date} : Expected Revenue: ${result.revenue.toLocaleString()}. Expected total capacity of the unreserved
          offices: {result.unreserved}
        </div>
      }
    </div>
  );
}
