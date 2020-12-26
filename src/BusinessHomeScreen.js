import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Auth } from 'aws-amplify'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'

const styles = StyleSheet.create({
	container: {
		height: 300,
		textAlign: 'center'
	}
})

const BusinessHomeScreen = () => {
	const [scan, setScan] = useState(true)
	const [userId, setUserId] = useState('12345')

	const handleQRCodeRead = e => {
		setEmail(e.data)
		setScan(false)
	}

	const handleLogout = () => {
		Auth.signOut()
	}
	const handleSubmit = () => {

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
			<Input
				value={userId}
				disabled
				leftIcon={
					<Icon
						name='user'
						size={24}
						color='black'
					/>
				}
			/>
			<Input
				placeholder='Enter amount'
				keyboardType='decimal-pad'
				leftIcon={
					<Icon
						name='usd'
						size={24}
						color='black'
					/>
				}
			/>
			<Button onPress={handleSubmit} title={'Submit'} />
			<Button onPress={handleLogout} title={'Log out'} />
		</>
	)
}

export default BusinessHomeScreen
