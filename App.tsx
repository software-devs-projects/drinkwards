import React, { useState } from 'react'
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet
} from 'react-native'
import {
	Card,
	Text
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

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
		textAlign: 'center'
	},
	cardTitle: {
		color: 'black',
		fontWeight: '400',
	},
	rewards: {
		color: 'black',
		fontWeight: '700'
	}
})

const App: React.FC = () => {
	const [rewardPoints, setRewardPoints] = useState(0)
	const [name, setName] = useState('Anshul')
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.body}>
				<Text h1 style={styles.appName}>Drinkwards</Text>
				<Text h4>
					<Text style={styles.user}>
						Hey
						{ ` ${name}`}
					</Text>
					🍺
				</Text>
				<LinearGradient colors={['#70371f', '#AA4B2B', '#FF9A75']} style={styles.linearGradient}>
					<Text h4 style={styles.cardTitle}>Reward Dollars</Text>
					<View>
						<Text h1 style={styles.rewards}>{rewardPoints}</Text>
					</View>
				</LinearGradient>
			</SafeAreaView>
		</>
	)
}

export default App
