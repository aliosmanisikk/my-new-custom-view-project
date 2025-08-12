import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'Order.title',
    defaultMessage: 'Order list',
  },
  subtitle: {
    id: 'Order.subtitle',
    defaultMessage: 'Logged-id user: {firstName} {lastName}',
  },
  demoHint: {
    id: 'Order.demoHint',
    defaultMessage:
      'This page demonstrates how you can develop a component following some of the Merchant Center UX Guidelines and development best practices. For instance, fetching data using GraphQL, displaying data in a paginated table, writing functional tests, etc.',
  },
  noResults: {
    id: 'Order.noResults',
    defaultMessage: 'There are no Order available in this project.',
  },
});
