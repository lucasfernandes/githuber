import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  loading: {
    marginTop: 20,
  },

  empty: {
    color: colors.inactive,
    alignSelf: 'center',
    marginTop: 50,
    position: 'absolute',
    top: 0,
    left: (metrics.globalWidth / 2) - 110,

  },
});

export default styles;
