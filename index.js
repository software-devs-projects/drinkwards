import React from 'react'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import { name as appName } from './app.json'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { createApolloClient } from './src/graphql/apollo'
import 'react-native-gesture-handler'

Amplify.configure({
	...config,
	Analytics: {
		disabled: true,
	},
})

const client = createApolloClient()

AppRegistry.registerComponent(appName, () => () =>
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
