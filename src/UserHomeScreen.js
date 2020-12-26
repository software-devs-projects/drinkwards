import React, { useState, useEffect } from 'react'
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet,
	Button
} from 'react-native'
import {
	Text
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import QRCode from 'react-native-qrcode-svg'
import { Auth } from 'aws-amplify'

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'black',
		display: 'flex',
		flexGrow: 1,
		padding: 10
	},
	appName: {
		color: 'white',
		fontWeight: 'bold'
	},
	user: {
		color: 'white',
		fontWeight: 'bold',
		opacity: 0.7
	},
	linearGradient: {
		borderRadius: 5,
		textAlign: 'center',
		margin: 30,
		padding: 10
	},
	cardTitle: {
		color: 'black',
		fontWeight: '400',
	},
	rewards: {
		color: 'black',
		fontWeight: '700'
	},
	qrContainer: {
		display: 'flex',
		alignItems: 'center',
		margin: 50

	}
})

const UserHomeScreen = () => {
	const [rewardPoints, setRewardPoints] = useState(0)
	const [qrId, setQrId] = useState(null)
	const [username, setUsername] = useState('')

	const setUserData = async () => {
		const user = await Auth.currentAuthenticatedUser()
		const { sub, email } = user.attributes
		setQrId(sub)
		setUsername(email.split('@')[0])
	}

	useEffect(() => {
		setUserData()
	}, [])

	const handleLogout = () => {
		Auth.signOut()
	}

	return (
		<>
			<StatusBar barStyle="light-content" />
			<SafeAreaView style={styles.body}>
				<Text h1 style={styles.appName}>Drinkwards</Text>
				<Text h4>
					<Text style={styles.user}>
						{`Hey ${username}`}
					</Text>
					🍺
				</Text>
				<LinearGradient colors={['#70371f', '#AA4B2B', '#FF9A75']} style={styles.linearGradient}>
					<Text h4 style={styles.cardTitle}>Reward Dollars</Text>
					<View>
						<Text h1 style={styles.rewards}>{rewardPoints}</Text>
					</View>
				</LinearGradient>
				<View style={styles.qrContainer}>
					{qrId && (<QRCode
						value={qrId}
						size={200}
					/>)}
				</View>
				<Button onPress={handleLogout} title={'Log out'} />
			</SafeAreaView>
		</>
	)
}

export default UserHomeScreen
