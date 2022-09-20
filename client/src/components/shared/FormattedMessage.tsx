import { FormattedMessage } from 'react-intl';
import { Text } from 'react-native';
import { LOCALES_EN } from '../../constants/locales/en';

type FormattedMessageProps = {
  id: string;
  style: Object;
};

export default function FormattedMessageComponent({
  id,
  style,
}: FormattedMessageProps) {
  console.log(id, style);
  return (
    <FormattedMessage id={id} defaultMessage={LOCALES_EN[id]}>
      {(msg) => <Text style={style}>{msg}</Text>}
    </FormattedMessage>
  );
}
