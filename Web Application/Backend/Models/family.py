# Import libraries
import pandas as pd
import tensorflow

# Set seed to produce reproducible results
tensorflow.random.set_seed(1)

# Import model tools
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
from tensorflow.keras.optimizers import Adam


# Function to create a neural network (return a function that returns the generated model)
def createNeuralNetwork(nodes1, nodes2, nodes3, learning_rate=0.001, name='model'):

    # Function that creates the model
    def neuralNetworkModel():
        model = Sequential(name=name)
        model.add(Dense(nodes1, activation='relu', input_dim=3,))
        model.add(Dense(nodes2, activation = 'relu'))
        model.add(Dense(nodes3, activation = 'relu'))
        model.add(Dense(1))

        model.compile(loss='mse', 
                      optimizer=Adam(learning_rate))
        return model

    # Return the function defined above
    return neuralNetworkModel


# Train the model and make a prediciton
def getCrimeRate(PctKids2Par,PctIlleg,TotalPctDiv):
    # Create a neural network
    neuralNetworkModel = createNeuralNetwork(40, 10, 4, 0.001, 'model1')
    neuralNetwork = neuralNetworkModel()

    # Read in the dataset from a .csv file
    file = open('./communities.csv', 'r', newline = '')
    df = pd.read_csv(file, delimiter = ',')

    # Create the training data which will be used to train the model
    inputColumns = df[['PctKids2Par','PctIlleg','TotalPctDiv']]
    outputColumn = df['ViolentCrimesPerPop']
    x_train, x_test, y_train, y_test = train_test_split(inputColumns, outputColumn, test_size = 0.2, random_state=21)

    # Train the neural network model
    neuralNetwork.fit(x_train, y_train, epochs=100, batch_size=100, verbose=0)

    print("MSE: ", neuralNetwork.evaluate(x_test, y_test, verbose = 0))

    # Make a prediction given the input attributes
    input = [[PctKids2Par,PctIlleg,TotalPctDiv]]

    output = neuralNetwork.predict(input)

    # Return the predicted output
    return output[0][0]
