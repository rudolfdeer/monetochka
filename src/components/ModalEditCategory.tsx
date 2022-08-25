import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
import { changeCategoryStyle } from '../api/categoriesApi';
import { COLORS } from '../constants/colors';
import { Category } from '../constants/defaultCategories';
import ModalColorPicker from './ModalColorPicker';

type ModalEditCategoryProps = {
  modalEditVisible: boolean;
  setModalEditVisible: Dispatch<SetStateAction<boolean>>;
  setCategories: Function;
  categories: Category[];
  currentCategory: Category;
};

export default function ModalEditCategory({
  modalEditVisible,
  setModalEditVisible,
  setCategories,
  categories,
  currentCategory,
}: ModalEditCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenIcon, setChosenIcon] = useState(currentCategory.icon);
  const [chosenColor, setChosenColor] = useState(currentCategory.color);
  const [modalColorVisible, setModalColorVisible] = useState(false);

  useEffect(() => {
    setChosenIcon(currentCategory.icon);
    setChosenColor(currentCategory.color);
  }, [currentCategory]);

  const handleEmojiPick = (emojiObject: EmojiType) => {
    setChosenIcon(emojiObject.emoji);
  };

  const handleFormSubmit = () => {
    const response = changeCategoryStyle(
      currentCategory.id,
      chosenIcon,
      chosenColor,
      categories
    );
    setCategories(response);
  };

  const getColorStyle = (color: string) => {
    return {
      color: color,
    };
  };

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
            <View style={styles.form}>
              <Text style={styles.icon}>{chosenIcon}</Text>
              <Text style={[styles.categoryName, getColorStyle(chosenColor)]}>
                {currentCategory.name}
              </Text>
              <Pressable onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.buttonSmall}>Add icon</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalColorVisible(true);
                  setModalColorVisible(true);
                }}
              >
                <Text style={styles.buttonSmall}>Set color</Text>
              </Pressable>
              <EmojiPicker
                onEmojiSelected={handleEmojiPick}
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
              />
              <ModalColorPicker
                modalColorVisible={modalColorVisible}
                setModalColorVisible={setModalColorVisible}
                setChosenColor={setChosenColor}
              />
              <Pressable
                style={styles.buttonBig}
                onPress={() => {
                  handleFormSubmit();
                  setModalEditVisible(!modalEditVisible);
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.buttonBig, styles.buttonLast]}
              onPress={() => setModalEditVisible(!modalEditVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
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
  form: {
    width: '100%',
    alignItems: 'center',
  },
  colorPicker: {
    width: '100%',
    height: 'auto',
  },
});
