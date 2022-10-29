// THIS HOOKS GRABS ALL THE FILTERABLE DATA FOR THE MODAL

import { fetchFilterData } from 'common/services/request/query/fetch-filter-data';
import { submit_multi } from '../../services/request';
import { useEffect, useState } from 'react';
import { getAllTags as extractTags } from 'meta/play-meta-util';

/**
 * run graphql query to retrive filterable data like creators, tags, level
 * @returns [loading, error, data]
 */

const useFetchFilterData = () => {
  const { getAllTags, getAllLevels, getAllUsers } = fetchFilterData;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const dataConstructor = (data) => {
    const [tags, levels, creators] = data;
    const structuredTags = extractTags(tags);

    return { tags: structuredTags, levels, creators };
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await submit_multi([getAllTags, getAllLevels, getAllUsers]);
        setData(dataConstructor(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [getAllTags, getAllLevels, getAllUsers]);

  return [loading, error, data];
};

export default useFetchFilterData;
