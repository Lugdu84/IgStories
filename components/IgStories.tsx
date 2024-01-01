import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	View,
	Image,
	Text,
	SafeAreaView,
	TextInput,
	Pressable,
} from 'react-native';
import { userStories } from '../stories';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from 'react-native-reanimated';

const storyViewDuration = 3 * 1000;

export default function IGStoriesScreen() {
	const [userIndex, setUserIndex] = useState(0);
	const [storyIndex, setStoryIndex] = useState(0);
	const progress = useSharedValue(0); // 0 to 1

	useEffect(() => {
		progress.value = 0;
		progress.value = withTiming(1, {
			duration: storyViewDuration,
		});
	}, [storyIndex, userIndex]);

	const goToNextStory = () => {
		if (storyIndex < user.stories.length - 1) {
			setStoryIndex((index) => index + 1);
		} else {
			goToNextUser();
		}
	};

	useAnimatedReaction(
		() => progress.value,
		(currentValue, previousValue) => {
			if (currentValue !== previousValue && currentValue === 1) {
				runOnJS(goToNextStory)();
			}
		}
	);

	const indicatorAnimatedStyle = useAnimatedStyle(() => ({
		width: `${progress.value * 100}%`,
	}));

	const user = userStories[userIndex];
	const story = user.stories[storyIndex];

	const goToPrevStory = () => {
		if (storyIndex > 0) {
			setStoryIndex((index) => index - 1);
		} else {
			goToPreviousUser();
		}
	};

	const goToNextUser = () => {
		if (userIndex < userStories.length - 1) {
			setUserIndex((index) => index + 1);
			setStoryIndex(0);
		}
	};
	const goToPreviousUser = () => {
		if (userIndex > 0) {
			setUserIndex((index) => index - 1);
			setStoryIndex(userStories[userIndex - 1].stories.length - 1);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.storyContainer}>
				{story.uri && (
					<Image
						style={styles.image}
						source={{ uri: story.uri }}
					/>
				)}
				<Pressable
					style={styles.navPressable}
					onPress={goToPrevStory}
				/>
				<Pressable
					style={[styles.navPressable, { right: 0 }]}
					onPress={goToNextStory}
				/>
				<View style={styles.header}>
					<LinearGradient
						colors={['rgba(0,0,0,0.7)', 'transparent']}
						style={StyleSheet.absoluteFill}
					/>
					<View style={styles.indicatorRow}>
						{user.stories.map((story, index) => (
							<View
								key={`${user.id}-${index}`}
								style={styles.indicatorBG}>
								<Animated.View
									style={[
										styles.indicator,
										storyIndex === index && indicatorAnimatedStyle,
										index > storyIndex && {
											width: 0,
										},
										index < storyIndex && {
											width: '100%',
										},
									]}
								/>
							</View>
						))}
					</View>
					<Text style={styles.username}>{user.userName}</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<TextInput
					style={styles.input}
					placeholder="Send message"
					placeholderTextColor={'gray'}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	storyContainer: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		width: '100%',
		paddingTop: 10,
		padding: 20,
		top: 0,
	},
	footer: {
		width: '100%',
		padding: 10,
		backgroundColor: 'black',
	},
	username: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		borderRadius: 20,
		color: 'white',
	},
	navPressable: {
		width: '30%',
		height: '100%',
		position: 'absolute',
	},
	indicatorRow: {
		flexDirection: 'row',
		marginBottom: 10,
		gap: 5,
	},
	indicatorBG: {
		backgroundColor: 'gray',
		height: 3,
		flex: 1,
		borderRadius: 20,
		overflow: 'hidden',
	},
	indicator: {
		backgroundColor: 'white',
		height: '100%',
	},
});
