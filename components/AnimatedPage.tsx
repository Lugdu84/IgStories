import Animated, {
	SharedValue,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

type AnimatedPageProps = {
	pageColor: string;
	width: number;
	index: number;
	pageIndex: SharedValue<number>;
	children?: React.ReactNode;
};

export default function AnimatedPage({
	pageColor,
	width,
	index,
	pageIndex,
	children,
}: AnimatedPageProps) {
	const anim = useAnimatedStyle(() => ({
		transform: [
			{ perspective: width * 2 },
			{
				rotateY: `${interpolate(
					pageIndex.value,
					[index - 1, index, index + 1],
					[90, 0, -90]
				)}deg`,
			},
		],
	}));
	return (
		<Animated.View
			style={[
				{
					width,
					position: 'absolute',
					aspectRatio: 9 / 16,
					backgroundColor: pageColor,
					backfaceVisibility: 'hidden',
					borderRadius: 10,
					transformOrigin: ['50%', '50%', -width / 2],
					zIndex: 100 - index,
					overflow: 'hidden',
				},
				anim,
			]}>
			{children}
		</Animated.View>
	);
}
