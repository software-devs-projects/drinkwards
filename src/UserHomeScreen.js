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
import { Auth, JS } from 'aws-amplify'
import { useLazyQuery } from '@apollo/client'
import { GET_REWARD_POINTS } from './graphql/ queries'

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'black',
		display: 'flex',
		flexGrow: 1,
		padding: 10
	},
	appName: {
		color: 'white',
		fontWeight: 'bold',
		margin : 10
	},
	username: {
		color: 'white',
		fontWeight: 'bold',
		opacity: 0.7,
	},
	usernameContainer: {
		marginLeft: 10
	},
	linearGradient: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: 5,
		margin: 30,
		padding: 10,
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
	const [getRewardPoints, rewardPointsResponse] = useLazyQuery(GET_REWARD_POINTS)

	const [rewardPoints, setRewardPoints] = useState(0)
	const [userId, setUserId] = useState(null)
	const [username, setUsername] = useState('')

	const setUserData = async () => {
		const user = await Auth.currentAuthenticatedUser()
		const { sub, email } = user.attributes
		setUserId(sub)
		setUsername(email.split('@')[0])

		const { jwtToken } = user.signInUserSession.idToken

		getRewardPoints({
			variables: {
				userId: sub
			},
			context: {
				headers: {
					Authorization: `Bearer ${jwtToken}`
				}
			}
		})
	}

	useEffect(() => {
		setUserData()
	}, [])

	useEffect(() => {
		if (rewardPointsResponse.data) {
			console.log(JSON.stringify(rewardPointsResponse.data, null, 2))
			setRewardPoints(rewardPointsResponse.data.user_by_pk.rewardPoints)
		}
	}, [rewardPointsResponse])

	const handleLogout = () => {
		Auth.signOut()
	}

	return (
		<>
			<StatusBar barStyle="light-content" />
			<SafeAreaView style={styles.body}>
				<Text h1 style={styles.appName}>Drinkwards</Text>
				<Text h4 style={styles.usernameContainer}>
					<Text style={styles.username}>
						{`Hey ${username}`}
					</Text>
					🍺
				</Text>
				<LinearGradient colors={['#70371f', '#AA4B2B', '#FF9A75']} style={styles.linearGradient}>
					<Text h4 style={styles.cardTitle}>Reward Dollars</Text>
					<View>
						<Text h1 style={styles.rewards}>${rewardPoints.toFixed(2)}</Text>
					</View>
				</LinearGradient>
				<View style={styles.qrContainer}>
					{userId && (<QRCode
						value={userId}
						size={200}
					/>)}
				</View>
				<Button onPress={handleLogout} title={'Log out'} />
			</SafeAreaView>
		</>
	)
}

export default UserHomeScreen
