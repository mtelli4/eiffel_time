import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#2E3494',
    padding: 16,
    borderRadius: 10,
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: 16,
    color: '#2E3494',
    width: 350,
  },
  helper: {
    fontFamily: 'Montserrat',
    margin: 4,
  },
  eye: {
    position: 'absolute',
    right: 20,
    color: '#2E3494',
    cursor: 'pointer',
  },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 8,
  },
  label: {
    left: 12,
    top: -10,
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Montserrat',
    color: '#2E3494',
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 4,
  },
})
