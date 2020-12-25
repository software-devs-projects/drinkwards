import React, { useState } from 'react'
import { StyleSheet, View, Alert, SafeAreaView, Button, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'

const styles = StyleSheet.create({
	container: {
		height: 300,
		textAlign: 'center'
	}
})

const App = () => {
	const [scan, setScan] = useState(true)
	const [email, setEmail] = useState('')

	const handleQRCodeRead = e => {
		setEmail(e.data)
	}

	return (
		<SafeAreaView>
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
		</SafeAreaView>
	)
}

export default App
