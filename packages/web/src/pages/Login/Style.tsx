import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: '100%',
    gap: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    color: '#2E3494'
  },
  logo: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 64,
    left: 64,
  },
  link: {
    fontFamily: 'Quicksand',
    fontSize: 20,
    fontWeight: 400,
    color: '#2E3494'
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  passwordConditions: {
    position: 'absolute',
    // right: 0,
    backgroundColor: '#2E3494'
  }
})