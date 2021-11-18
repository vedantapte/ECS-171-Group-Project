from Models import family
from Models import wealth
from Models import race
from Models import allCategories

familyOutput = family.familyModel(0.59, 0.14, 0.75)
print("Family Output: ", familyOutput)

wealthOutput = wealth.wealthModel(0.19, 0.15, 0.6)
print("Wealth Output: ", wealthOutput)

raceOutput = race.raceModel(0.02, 0.9)
print("Race Output: ", raceOutput)

allCategoriesOutput = allCategories.allCategoriesModel(0.59, 0.14, 0.75, 0.02, 0.9, 0.19, 0.15, 0.6)
print("All Categories Output: ", allCategoriesOutput)
