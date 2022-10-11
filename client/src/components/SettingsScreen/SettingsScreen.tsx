import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackParamList } from '../../../App';
import { STYLES } from '../../styles/styles';
import Navbar from '../shared/Navbar';
import CurrencySection from './CurrencySection';

type SettingsScreenProps = NativeStackScreenProps<StackParamList, 'Settings'>;

function SettingsScreen(props: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar params={props} titleId="SETTINGS" messageId="SETTINGS_MSG" />
        <CurrencySection props={props}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...STYLES.PAGE_CONTAINER,
  },
});

export default observer(SettingsScreen);
