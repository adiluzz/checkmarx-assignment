import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { ResponseData } from './api/[[...data]]';

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
      <div>
        Select Month
      </div>
      <input
        type='month'
        onChange={(ev) => {
          setMonth(ev.target.value.split('-')[1]);
          setYear(ev.target.value.split('-')[0]);
        }}
      />
      <button disabled={!month} onClick={getMonthData}>Get Data</button>
      {
        result &&
        <div>
          {result.year}-{result.month} : Expected Revenue: {result.revenue}$ expected total capacity of the unreserved
          offices: {result.unreserved}
        </div>
      }
    </div>
  );
}
