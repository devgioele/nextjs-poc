import axios from 'axios';
import useSWR from 'swr';
import { ISSNowData } from '../types/apiExternal';
import { CompanyData } from '../types/apiInternal';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const issEndpoint = 'http://api.open-notify.org/iss-now.json';

export const getISS = () => axios.get<ISSNowData>(issEndpoint);

export const useISS = (refreshInterval: number = 0) =>
  useSWR<ISSNowData>(issEndpoint, fetcher, { refreshInterval });

export const useCompany = (refreshInterval: number = 0) =>
  useSWR<CompanyData>('api/company', fetcher, { refreshInterval });
