import { Dispatch, SetStateAction } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { Category } from '../constants/defaultCategories';

type ModalEditCategoryProps = {
  modalEditVisible: boolean;
  setModalEditVisible: Dispatch<SetStateAction<boolean>>;
  setCategories: Function;
  categories: Category[];
};

export default function ModalEditCategory({
  modalEditVisible,
  setModalEditVisible,
  setCategories,
  categories,
}: ModalEditCategoryProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalEditVisible}
      onRequestClose={() => {
        setModalEditVisible(!modalEditVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalEditVisible(!modalEditVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: COLORS.BUTTON,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  // form: {
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // inputText: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   marginBottom: 16,
  //   width: '100%',
  //   height: 50,
  //   textAlign: 'center',
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   borderColor: COLORS.BLACK,
  //   borderRadius: 13,
  // },
});
