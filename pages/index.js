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
      <DataTable statArray={filteredStats} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await axios.get(
    'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/',
    {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host':
          'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
      }
    }
  );

  return {
    props: {
      statistics: res.data
    }
  };
}
