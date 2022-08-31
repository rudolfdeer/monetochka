import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { COLORS } from '../constants/colors';

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
              style={[styles.buttonBig, styles.buttonLast]}
              onPress={() => setModalColorVisible(!modalColorVisible)}
            >
              <Text style={styles.buttonText}>Select</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonBig: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: COLORS.BUTTON,
    marginBottom: 16,
    width: '60%',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer: {
    width: '100%',
  },
  modalView: {
    margin: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonLast: {
    backgroundColor: COLORS.BUTTON,
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
    fontSize: 12,
    color: COLORS.BUTTON,
    marginBottom: 10,
  },
  colorPicker: {
    width: '100%',
    height: 'auto',
  },
  pickerContainer: {
    width: '100%',
    justifyContent: 'center',
    height: 400,
    marginBottom: 18,
  },
});
