import styles from '../styles/ISS.module.css';
import { NextPage } from 'next';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCompany } from '../lib/api';

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
    </div>
  );
};

export default Hello;
