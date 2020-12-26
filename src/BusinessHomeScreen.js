import React, { useState } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Auth } from 'aws-amplify'
import { RNCamera } from 'react-native-camera'

const styles = StyleSheet.create({
	container: {
		height: 300,
		textAlign: 'center'
	}
})

const BusinessHomeScreen = () => {
	const [scan, setScan] = useState(true)
	const [email, setEmail] = useState('')

	const handleQRCodeRead = e => {
		setEmail(e.data)
	}

	const handleLogout = () => {
		Auth.signOut()
	}

	return (
		<>
			<View style={styles.container}>
				{scan && (
					<RNCamera
						style={{ flex: 1, alignItems: 'center' }}
						captureAudio={false}
						onBarCodeRead={handleQRCodeRead}
					/>
				)}
			</View>
			<Button onPress={() => setScan(!scan)} title={scan ? 'Stop' : 'Scan'} />
			<Text>{email}</Text>
			<Button onPress={handleLogout} title={'Log out'} />
		</>
	)
}

export default BusinessHomeScreen
