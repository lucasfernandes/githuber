import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loading: {
    marginTop: 20,
  },

  empty: {
    color: colors.inactive,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default styles;
