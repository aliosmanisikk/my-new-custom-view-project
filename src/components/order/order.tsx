import { useIntl } from 'react-intl';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import Constraints from '@commercetools-uikit/constraints';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { useOrderDetailsFetcher } from '../../hooks/use-order-details-connector';
import { getErrorMessage } from '../../helpers';
import messages from './messages';
import Grid from '@commercetools-uikit/grid';

const Order = () => {
  const intl = useIntl();
  const { user, hostUrl } = useCustomViewContext(
    (context) => {
        console.log(context)
        return {
          user: context.user,
          dataLocale: context.dataLocale,
          projectLanguages: context.project?.languages,
          hostUrl: context.hostUrl,
        }
      }
  );

  let orderId: string | null = null;
  const match = hostUrl.match(/\/orders\/([^/]+)/);
  if (match) {
    orderId = match[1];
  }


  const { result, error, loading } = useOrderDetailsFetcher(orderId || "");


  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  if (!loading && !result) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <Text.Subheadline as="h4">
          {intl.formatMessage(messages.subtitle, {
            firstName: user?.firstName,
            lastName: user?.lastName,
          })}
        </Text.Subheadline>
      </Spacings.Stack>

      <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal>

      {loading && <LoadingSpinner />}

      {result ? (
        <Spacings.Stack scale="l">
          
            <Grid
              gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <Text.Body>{'Order ID'}</Text.Body>
              <Text.Body>{result.id}</Text.Body>
              <Text.Body>{'Order number'}</Text.Body>
              <Text.Body>{result.orderNumber}</Text.Body>
              <Text.Body>{'Payment method'}</Text.Body>
              <Text.Body>{result.paymentInfo?.payments[0].paymentMethodInfo?.method}</Text.Body>
            </Grid>

        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Order.displayName = 'Order Details';

export default Order;
