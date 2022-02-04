import axios from 'axios';
import useSWR from 'swr';

export function useGlobalStatistics() {
  const fetcher = (url, headerValue) =>
    axios
      .get(url, { headers: headerValue })
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          console.error(
            'An error occurred while fetching global COVID statistics.'
          );
        } else if (err.request) {
          console.error(err.request);
        } else {
          console.error('Error: ', err.message);
        }
      });

  const apiUrl =
    'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/';
  const headers = {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'x-rapidapi-host':
      'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
  };

  const { data, error } = useSWR([apiUrl, headers], fetcher);
  return {
    statistics: data,
    isLoading: !error && !data,
    isError: error
  };
}
