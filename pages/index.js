import { useState } from 'react';
import { useGlobalStatistics } from '../lib/useGlobalStatistics';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import DataTable from '../components/DataTable';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const { statistics, isLoading, isError } = useGlobalStatistics();

  const statArray = !isLoading && Object.entries(statistics);
  const filteredStats =
    !isLoading &&
    statArray.filter(
      stat =>
        stat[1].Continent !== 'All' &&
        (stat[1].Country?.toLowerCase().includes(searchTerm) ||
          stat[1].Continent?.toLowerCase().includes(searchTerm))
    );
  const onInputChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Layout title='COVID-19 Tracker'>
      <SearchInput onChange={onInputChange} />
      <DataTable isLoading={isLoading} statArray={filteredStats} />
    </Layout>
  );
}
