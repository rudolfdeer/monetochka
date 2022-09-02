import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const STYLES = StyleSheet.create({
  BUTTON_BIG: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    backgroundColor: COLORS.BUTTON,
  },
  BUTTON_BIG_TEXT: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  BUTTON_SMALL: {
    fontSize: 12,
    color: COLORS.BUTTON,
  },
  ICON: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.ICON,
    marginRight: 8,
  },
  ICON_EMOJI: {
    width: 24,
    height: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SECTION_TITLE: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  PAGE_TITLE: {
    height: 42,
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 41,
  },
  PAGE_MESSAGE: {
    fontSize: 17,
    height: 42,
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
  },
  SECTION_CONTAINER: {
    paddingHorizontal: 16,
    width: '100%',
  },
  PAGE_CONTAINER: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
  MODAL_CENTERED: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  MODAL_CONTAINER: {
    width: '100%',
  },
  MODAL_VIEW: {
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
  SECTION: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 13,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  SECTION_ELEMENT: {
    height: 24,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 18,
  },
  SECTION_ELEMENT_ROW_CONTINER: {
    flexDirection: 'row',
  }
});