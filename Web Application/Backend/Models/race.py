# RACE ATTRIBUTES VS. VIOLENT CRIMES PER 100K
# INPUT ATTRIBUTES: racepctblack, racePctWhite

# Import libraries
import pandas as pd

# Import model tools
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

def raceModel(racepctblack, racePctWhite):
    # Read in the dataset from a .csv file
    file = open('./communities.csv', 'r', newline = '')
    df = pd.read_csv(file, delimiter = ',')

    # Split the dataset into training and testing sets with a 80:20 ratio
    inputColumns = df[['racepctblack','racePctWhite']].to_numpy()
    outputColumn = df['ViolentCrimesPerPop'].to_numpy()
    x_train, x_test, y_train, y_test = train_test_split(inputColumns, outputColumn,test_size = 0.2, random_state=21)

    # Train the linear regression model
    reg = LinearRegression()
    reg.fit(x_train, y_train)

    input = [[racepctblack, racePctWhite]]

    output = reg.predict(input)

    return output[0]
