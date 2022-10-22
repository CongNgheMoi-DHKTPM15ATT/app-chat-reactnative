import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Emoji from "./Emoji";

const EmojisTab = ({ emojis }) => {
	return (
		<FlatList
			style={styles.container}
			data={emojis}
			renderItem={({ item }) => <Emoji emoji={item.char} />} 
			keyExtractor={item => item.char}
			numColumns={8}
		/>

	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

export default EmojisTab;