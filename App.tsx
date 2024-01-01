import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	View,
	Image,
	Text,
	SafeAreaView,
	TextInput,
	Pressable,
	Button,
} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	withTiming,
	runOnJS,
	interpolate,
	SharedValue,
} from 'react-native-reanimated';
import IGStoriesScreen from '@/components/IgStories';
import AnimatedPage from '@/components/AnimatedPage';
import { userStories } from '@/stories';

const pages = ['#e1f3fa', '#0F7538', '#F2D338', '#F2A338', '#F26F38'];

export default function App() {
	const allStories = userStories.flatMap((user) => user.stories);
	const width = 200;
	const pageIndex = useSharedValue(0);

	const goNext = () => {
		pageIndex.value = withTiming(Math.floor(pageIndex.value + 1), {
			duration: 1000,
		});
	};

	const goBack = () => {
		pageIndex.value = withTiming(Math.floor(pageIndex.value - 1), {
			duration: 1000,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* <IGStoriesScreen /> */}
			{allStories.map((story, index) => (
				<AnimatedPage
					key={story.uri}
					pageColor={'black'}
					width={width}
					pageIndex={pageIndex}
					index={index}>
					<Image
						style={{ width: '100%', height: '100%' }}
						source={{ uri: story.uri }}
					/>
				</AnimatedPage>
			))}

			<View
				style={{
					position: 'absolute',
					right: 50,
					bottom: 50,
					flexDirection: 'row',
				}}>
				<Button
					title="Previous"
					onPress={goNext}
				/>
				<Button
					title="Next"
					onPress={goBack}
				/>
			</View>

			<StatusBar style="light" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
