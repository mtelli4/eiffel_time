import {Dimensions, StyleSheet} from 'react-native';

// Obtenir la largeur de l'écran pour calculer les dimensions des boutons
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E3494',
    marginBottom: 20,
    paddingTop: 10,
    paddingRight: 20, // Pour éviter le chevauchement avec le bouton de fermeture
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // Définir une hauteur fixe pour le conteneur de boutons
    height: 44,
    // Assurer que le conteneur s'étire sur toute la largeur disponible
    width: '100%',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E3494',
    paddingVertical: 10,
    borderRadius: 5,
    // Fixer la largeur à 48% de la largeur du conteneur modal
    width: '48%',
  },
  qrButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
    // Empêcher le texte de faire des retours à la ligne
    flexShrink: 1,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2E3494',
    paddingVertical: 10,
    borderRadius: 5,
    // Fixer la largeur à 48% de la largeur du conteneur modal
    width: '48%',
  },
  chatButtonText: {
    color: '#2E3494',
    fontSize: 14,
    marginLeft: 8,
    // Empêcher le texte de faire des retours à la ligne
    flexShrink: 1,
  },
});
