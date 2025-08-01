import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton'; // Assuming IconButton is a separate component
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle'; // Assuming Subtitle is a separate component
import List from '../components/MealDetail/List'; // Assuming List is a separate component
import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailScreen({ route, navigation }) {
	const favoriteMealsCtx = useContext(FavoritesContext);

	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			favoriteMealsCtx.removeFavorite(mealId);
		} else {
			favoriteMealsCtx.addFavorite(mealId);
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: selectedMeal.title,
			headerRight: () => {
				return <IconButton
					icon={mealIsFavorite ? 'star' : 'star-outline'}
					color={mealIsFavorite ? 'gold' : 'white'}
					onPress={changeFavoriteStatusHandler} />
			},
		});
	}, [navigation, changeFavoriteStatusHandler, selectedMeal.title]);

	return (
		<ScrollView style={styles.rootContainer}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<MealDetails
				duration={selectedMeal.duration}
				complexity={selectedMeal.complexity}
				affordability={selectedMeal.affordability}
				textStyle={styles.detailText}
			/>
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients} />
					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

export default MealDetailScreen

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 350,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center',
		margin: 8,
		color: 'white',
	},
	detailText: {
		color: 'white',
	},
	listOuterContainer: {
		alignItems: 'center',
	},
	listContainer: {
		width: '80%',
	},
	rootContainer: {
		marginBottom: 32,
	}
});