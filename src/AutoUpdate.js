import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Linking,
  TouchableOpacity,
} from 'react-native';
import VersionCheck from 'react-native-version-check';

export default function AutoUpdate() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    checkAppUpdate();
  }, []); // Empty dependency array to mimic componentDidMount

  const checkAppUpdate = async () => {
    try {
      const res = await VersionCheck.needUpdate();
      console.log('res.isNeeded', res.isNeeded);
      console.log('New version available:', res.latestVersion);
      console.log('Current version:', res.currentVersion);

      if (res.isNeeded) {
        setOpenModal(true);
        console.log('tuuuuuue:', res.latestVersion);
      }
    } catch (error) {
      console.error('Error checking for app update:', error);
    }
  };

  const updateApp = () => {
    VersionCheck.getStoreUrl({
      appID: 'com.vhs1', // Replace with your app ID
      appName: 'Vijay Home Services', // Replace with your app name
    })
      .then(url => {
        Linking.canOpenURL(url)
          .then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              // Handle unsupported URL
            }
          })
          .catch(err => console.error('An error occurred', err));
      })
      .catch(err => {
        console.log(`error is: ${err}`);
      });
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}> New update is available!</Text>
            <Text style={{color: 'grey', textAlign: 'center'}}>
              The current version of this application is no longer supported. We
              apologize for any inconvenience we may have caused you.
            </Text>
            <TouchableOpacity style={styles.updateButton} onPress={updateApp}>
              <Text style={styles.updateButtonText}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'darkred',
  },
  updateButton: {
    backgroundColor: 'darkred',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'darkred',
  },
});
