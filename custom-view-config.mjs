/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'My New Custom View Project',
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'io-white-label-development',
    },
    production: {
      customViewId: 'cme899v30001k1i01absr8lbn',
      url: 'https://my-custom-view.com',
    },
  },
  oAuthScopes: {
    view: ['view_orders'],
    manage: ['manage_orders'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['orders.order_details.general'],
};

export default config;
