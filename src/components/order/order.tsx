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
import { useParams } from 'react-router-dom';

const Order = () => {
  const intl = useIntl();
  const { projectKey, orderId } = useParams();

  const { user } = useCustomViewContext(
    (context) => ({
      user: context.user,
      dataLocale: context.dataLocale,
      projectLanguages: context.project?.languages,
    })
  );
  const { result, error, loading } = useOrderDetailsFetcher(projectKey);

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

        <Text.Headline as="h2" intlMessage={messages.title} />

        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Order.displayName = 'Order Details';

export default Order;
