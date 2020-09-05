import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {
    borderRightWidth: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    padding: 8,
    alignItems: 'center',
    elevation: 1,
  },
  descriptionContainer: {
    borderBottomWidth: 1,
    borderRightWidth: 3,
    borderColor: '#DDD',
    borderBottomRightRadius: 5,
    padding: 1,
    paddingLeft: 20,
    marginBottom: 20,
  },
  reqContainer: {
    borderRightWidth: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    elevation: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  projectDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  projectDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'right',
    paddingRight: 5,
  },
  projectReq: {
    fontSize: 11,
    color: '#999',
    lineHeight: 14,
    textAlign: 'left',
  },
  projectContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  list: {
    padding: 20,
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#5a5a5a',
    lineHeight: 20,
    textAlign: 'left'
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});

export default styles;
