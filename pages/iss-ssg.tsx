import { getISS, useISS } from '../lib/api';
import { ISSNowData } from '../types/apiExternal';
import styles from '../styles/ISS.module.css';
import { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import printLoc from '../lib/common';

type ISSProps = {
  issStatic?: ISSNowData;
};

type ISSStaticProps = {
  props: ISSProps;
};

const ISSStatic: NextPage<ISSProps> = ({ issStatic }) => {
  const { data: issNow, error: issNowError } = useISS(3000);
  const { longitude: staticLon, latitude: staticLat } =
    issStatic?.iss_position || {};
  const { longitude: currentLon, latitude: currentLat } =
    issNow?.iss_position || {};

  useEffect(() => {
    if (issNowError) {
      toast.error('ISS data could not be fetched!');
    }
  }, [issNowError]);

  return (
    <div className={styles.grid}>
      <a className={styles.card}>
        <h2>getStaticProps</h2>
        {staticLon && staticLat ? (
          <p>
            {`Position of the ISS at build time: ${printLoc(
              staticLon,
              staticLat
            )}`}
          </p>
        ) : (
          <p className={styles.error}>
            Data could not be fetched at build time
          </p>
        )}
      </a>
      <a className={styles.card}>
        <h2>polling</h2>
        <p>
          {`Current position of the ISS: ${
            currentLon && currentLat
              ? printLoc(currentLon, currentLat)
              : 'loading'
          }`}
        </p>
      </a>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<ISSStaticProps> => {
  const response = await getISS().catch();

  return {
    props: {
      issStatic: response?.data,
    },
  };
};

export default ISSStatic;
