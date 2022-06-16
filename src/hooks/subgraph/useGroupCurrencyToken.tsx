import useSWR from 'swr'

// import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
// import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
// import { groupCurrencyTokens } from '@/types/subgraph/__generated__/groupCurrencyTokens'

// export const fetchGroupCurrencyTokens = () =>
//   graphqlFetcher<groupCurrencyTokens, GroupCurrencyTokensVariables>(
//     GROUP_CURRENCY_TOKEN_QUERY,
//     {},
//   ).then((groupCurrencyTokens) => {
//     console.log({ groupCurrencyTokens })
//     return groupCurrencyTokens
//   })

// export const useGroupCurrencyTokens = () => {
//   const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () => fetchGroupCurrencyTokens())

//   return { groupCurrencyTokens: data, error, refetch: mutate, loading: !error && !data }
// }
