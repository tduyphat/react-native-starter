import { useEffect } from 'react';
import {
  fetchApiData,
  selectApiData,
  selectApiLoading,
  selectApiError,
} from '../slices/api-slice';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { tokenStorage } from '../services/tokenStorage';

const useApiData = () => {
  const dispatch = useAppDispatch();
  const apiData = useAppSelector(selectApiData);
  const loading = useAppSelector(selectApiLoading);
  const error = useAppSelector(selectApiError);

  const fetchItemsWithToken = async () => {
    const savedToken = await tokenStorage.get();
    if (!savedToken) return;
    dispatch(fetchApiData(savedToken));
  }

  useEffect(() => {
    fetchItemsWithToken()
  }, []);

  return { apiData, loading, error };
};

export default useApiData;
