import { useState } from 'react';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadExampleData,
  loadingExampleDataFailure,
} from '../features/persist/persistSlice';

const DataList = () => {
  const dispatch = useAppDispatch();
  const exampleData = useAppSelector((state) => state.persist.exampleData);
  const error = useAppSelector((state) => state.persist.error);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window
      .fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          dispatch(loadingExampleDataFailure());
          setIsLoading(false);
          return;
        }
        response.json().then((data) => {
          dispatch(loadExampleData(data));
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
        dispatch(loadingExampleDataFailure());
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div>
      <h1>API DATA:</h1>
      {exampleData && !isLoading ? (
        <pre>
          <code>{JSON.stringify(exampleData, null, 2)}</code>
        </pre>
      ) : (
        <p style={{ color: 'blue' }}>Loading...</p>
      )}
      {error && <p style={{ color: 'red' }}>Error fetching data.</p>}
    </div>
  );
};

export default DataList;
