import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { FavoritesContext } from '../store/context/favorites-context';
import { MEALS } from '../data/dummy-data';


function FavoritesScreen() {
  const favoriteMealsCtx = useContext(FavoritesContext)

  const favoriteMeals = MEALS.filter(meal => favoriteMealsCtx.ids.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Your favorited meals will show up here!</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />
}


export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  }
});