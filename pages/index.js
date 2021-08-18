import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import DataTable from '../components/DataTable';

export default function Index({ statistics }) {
  const [searchTerm, setSearchTerm] = useState('');
  const statArray = Object.entries(statistics);
  const filteredStats = statArray.filter(
    stat =>
      stat[1].All.abbreviation !== undefined &&
      (stat[1].All.country?.toLowerCase().includes(searchTerm) ||
        stat[1].All.continent?.toLowerCase().includes(searchTerm) ||
        stat[1].All.location?.toLowerCase().includes(searchTerm))
  );
  const onInputChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Layout title='COVID-19 Tracker'>
      <SearchInput onChange={onInputChange} />
      <DataTable statArray={filteredStats} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await axios.get('https://covid-api.mmediagroup.fr/v1/cases');

  return {
    props: {
      statistics: res.data
    }
  };
}
