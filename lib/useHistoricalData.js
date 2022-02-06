import axios from 'axios';
import useSWR from 'swr';

export function useHistoricalData(isoCode) {
  const fetcher = (url, headerValue) =>
    axios
      .get(url, { headers: headerValue })
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          console.error(
            'An error occurred while fetching historical COVID data.'
          );
        } else if (err.request) {
          console.error(err.request);
        } else {
          console.error('Error: ', err.message);
        }
      });

  const apiUrl = `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${isoCode}`;
  const headers = {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'x-rapidapi-host':
      'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
  };

  const { data, error } = useSWR([apiUrl, headers], fetcher);
  return {
    historicalData: data,
    isLoading: !error && !data,
    isError: error
  };
}
