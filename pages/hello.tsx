import styles from '../styles/Hello.module.css';
import { NextPage } from 'next';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCompany } from '../lib/api';
import Image from 'next/image';

const Hello: NextPage = () => {
  const { data: companyData, error: companyError } = useCompany(3000);

  useEffect(() => {
    if (companyError) {
      toast.error('Company data could not be fetched!');
    }
  }, [companyError]);

  const time = companyData && new Date(companyData.time).toString();

  return (
    <div className={styles.grid}>
      <a className={styles.card}>
        <h2>
          Polling <code className={styles.code}>api/company</code>
        </h2>

        {companyData ? (
          <>
            <p className={styles.description}>
              Message from company:
              <br />
              {companyData.company}
            </p>
            <hr />
            <p className={styles.description}>
              The server sent this at:
              <br />
              {time}
            </p>
          </>
        ) : (
          'loading'
        )}
      </a>
      <a className={styles.card}>
        <Image
          src="/nextjs-logo.png"
          alt="nextjs"
          width="512px"
          height="309px"
        />
      </a>
    </div>
  );
};

export default Hello;
