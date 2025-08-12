/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TFetchOrderDetailsQuery,
  TFetchOrderDetailsQueryVariables,
} from '../../types/generated/ctp';
import FetchOrderDetailsQuery from './fetch-order-details.ctp.graphql';

type TUseOrderDetailsFetcher = (id: string) => {
  result?: TFetchOrderDetailsQuery['order'];
  error?: ApolloError;
  loading: boolean;
};

export const useOrderDetailsFetcher: TUseOrderDetailsFetcher = (id) => {
  const { data, error, loading } = useMcQuery<
    TFetchOrderDetailsQuery,
    TFetchOrderDetailsQueryVariables
  >(FetchOrderDetailsQuery, {
    variables: { id },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    result: data?.order,
    error,
    loading,
  };
};
