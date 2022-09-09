import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { LOCALES } from '../constants/locales';
import { STYLES } from '../styles/styles';

type ModalColorPickerProps = {
  modalColorVisible: boolean;
  setModalColorVisible: Dispatch<SetStateAction<boolean>>;
  setChosenColor: Dispatch<SetStateAction<string>>;
};

export default function ModalColorPicker({
  modalColorVisible,
  setModalColorVisible,
  setChosenColor,
}: ModalColorPickerProps) {
  const handleColorChange = (color: string) => {
    setChosenColor(color);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalColorVisible}
      onRequestClose={() => {
        setModalColorVisible(!modalColorVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.pickerContainer}>
              <ColorPicker
                onColorChange={handleColorChange}
                noSnap={true}
                row={false}
              />
            </View>
            <Pressable
              style={styles.buttonLast}
              onPress={() => setModalColorVisible(!modalColorVisible)}
            >
              <Text style={styles.buttonText}>{LOCALES.SELECT}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonBig: {
    ...STYLES.BUTTON_BIG,
    marginBottom: 16,
    width: '60%',
  },
  buttonText: {
    ...STYLES.BUTTON_BIG_TEXT,
  },
  centeredView: {
    ...STYLES.MODAL_CENTERED,
  },
  modalContainer: {
    ...STYLES.MODAL_CONTAINER,
  },
  modalView: {
    ...STYLES.MODAL_VIEW,
  },
  buttonLast: {
    ...STYLES.BUTTON_BIG,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  categoryName: {
    height: 20,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 18,
  },
  icon: {
    height: 20,
    marginBottom: 10,
  },
  buttonSmall: {
    ...STYLES.BUTTON_SMALL,
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    justifyContent: 'center',
    height: 400,
    marginBottom: 18,
  },
});
