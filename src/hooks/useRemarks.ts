import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addRemarks, getRemarks } from "../api/remarks";
import { toggleNewItemWindow, setAddNewItemWindowType, setDefaultMediaAssociation } from "../store/reducers/searchResultsReducer";

const useRemarks = () => {
  const { uniqueId } = useParams<{ uniqueId: string }>();

  useEffect(() => {
    if (uniqueId) {
      getRemarksMutation(uniqueId)
    }
  }, [uniqueId])

  /**
   * add remarks api
   */
  const { isLoading: addLoading, error: addErr, data: addData, mutate: addRemarksMutation } = useMutation(addRemarks, {
    retry: false,
    onSuccess: () => {
      if (uniqueId) {
        getRemarksMutation(uniqueId);
      }
    }
  });
  /**
   * fetch remarks api
   */
  const { isLoading, error, data, mutate: getRemarksMutation } = useMutation(getRemarks, {
    retry: false
  });

  console.log(data, 'data inside hooks')

  return {
    loading: isLoading,
    error,
    data,
    addRemarksMutation,
    getRemarksMutation
  };
};

export default useRemarks;
