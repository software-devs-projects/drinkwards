import React from 'react'
import {
	SafeAreaView,
	Text,
	StatusBar
} from 'react-native'

const App: React.FC = () => (
	<>
		<StatusBar barStyle="dark-content" />
		<SafeAreaView>
			<Text>
				Hello
			</Text>
		</SafeAreaView>
	</>
)

export default App
