from Models import family
from Models import wealth
from Models import race
from Models import allCategories
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/family', methods=['GET'])
def calcViolentCrimesModel1():
    PctKids2Par = float(request.args.get('PctKids2Par'))/100 #Attributes will come from the front end
    PctIlleg = float(request.args.get('PctIlleg'))/100
    TotalPctDiv = float(request.args.get('TotalPctDiv'))/100
    familyOutput = family.getCrimeRate(PctKids2Par, PctIlleg, TotalPctDiv)
    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': str(familyOutput)} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/wealth', methods=['GET'])
def calcViolentCrimesModel2():
    PctPopUnderPov = float(request.args.get('PctPopUnderPov'))/100 #Attributes will come from the front end
    pctWPubAsst = float(request.args.get('pctWPubAsst'))/100
    pctWInvInc = float(request.args.get('pctWInvInc'))/100
    wealthOutput = wealth.getCrimeRate(PctPopUnderPov, pctWPubAsst, pctWInvInc)
    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': str(wealthOutput)} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/race', methods=['GET'])
def calcViolentCrimesModel3():
    racepctblack = float(request.args.get('racepctblack'))/100 #Attributes will come from the front end
    racePctWhite = float(request.args.get('racePctWhite'))/100
    raceOutput = race.getCrimeRate(racepctblack, racePctWhite)

    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': str(raceOutput)} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/all', methods=['GET'])
def calcViolentCrimesModel4():
    PctKids2Par = float(request.args.get('PctKids2Par'))/100 #Attributes will come from the front end
    PctIlleg = float(request.args.get('PctIlleg'))/100
    TotalPctDiv = float(request.args.get('TotalPctDiv'))/100
    PctPopUnderPov = float(request.args.get('PctPopUnderPov'))/100 #Attributes will come from the front end
    pctWPubAsst = float(request.args.get('pctWPubAsst'))/100
    pctWInvInc = float(request.args.get('pctWInvInc'))/100
    racepctblack = float(request.args.get('racepctblack'))/100 #Attributes will come from the front end
    racePctWhite = float(request.args.get('racePctWhite'))/100
    allCategoriesOutput = allCategories.getCrimeRate(PctKids2Par,PctIlleg,TotalPctDiv,racepctblack,racePctWhite,PctPopUnderPov,pctWPubAsst,pctWInvInc)

    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': str(allCategoriesOutput)} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True) #backend will run on http://localhost:8000
#To test the api run the following (you can modify the attributes if you want):
#curl --location --request GET "http://localhost:8000/?PctLess9thGrade=2&PctNotHSGrad=3&PctBSorMore=4&PctUnemployed=5"
#Or download Postman for a nice UI