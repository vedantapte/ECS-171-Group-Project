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
    PctKids2Par = float(request.args.get('PctKids2Par')) #Attributes will come from the front end
    PctIlleg = float(request.args.get('PctIlleg'))
    TotalPctDiv = float(request.args.get('TotalPctDiv'))
    if (not PctKids2Par or not PctIlleg or not TotalPctDiv): #Bad request if user didn't send in an argument.
        return Response("Missing attribute.", status=400)
    familyOutput = family.familyModel(PctKids2Par, PctIlleg, TotalPctDiv)
    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': familyOutput} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/wealth', methods=['GET'])
def calcViolentCrimesModel2():
    PctPopUnderPov = float(request.args.get('PctPopUnderPov')) #Attributes will come from the front end
    pctWPubAsst = float(request.args.get('pctWPubAsst'))
    pctWInvInc = float(request.args.get('pctWInvInc'))
    if (not PctPopUnderPov or not pctWPubAsst or not pctWInvInc): #Bad request if user didn't send in an argument.
        return Response("Missing attribute.", status=400)
    wealthOutput = wealth.wealthModel(PctPopUnderPov, pctWPubAsst, pctWInvInc)
    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': wealthOutput} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/race', methods=['GET'])
def calcViolentCrimesModel3():
    racepctblack = float(request.args.get('racepctblack')) #Attributes will come from the front end
    racePctWhite = float(request.args.get('racePctWhite'))
    if (not racepctblack or not racePctWhite): #Bad request if user didn't send in an argument.
        return Response("Missing attribute.", status=400)
    raceOutput = race.raceModel(racepctblack, racePctWhite)

    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': raceOutput} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

@app.route('/all', methods=['GET'])
def calcViolentCrimesModel4():
    PctKids2Par = float(request.args.get('PctKids2Par')) #Attributes will come from the front end
    PctIlleg = float(request.args.get('PctIlleg'))
    TotalPctDiv = float(request.args.get('TotalPctDiv'))
    PctPopUnderPov = float(request.args.get('PctPopUnderPov')) #Attributes will come from the front end
    pctWPubAsst = float(request.args.get('pctWPubAsst'))
    pctWInvInc = float(request.args.get('pctWInvInc'))
    racepctblack = float(request.args.get('racepctblack')) #Attributes will come from the front end
    racePctWhite = float(request.args.get('racePctWhite'))
    if (not PctKids2Par or not PctIlleg or not TotalPctDiv or not PctPopUnderPov or not pctWPubAsst or not pctWInvInc or not racepctblack or not racePctWhite): #Bad request if user didn't send in an argument.
        return Response("Missing attribute.", status=400)
    allCategoriesOutput = allCategories.allCategoriesModel(PctKids2Par,PctIlleg,TotalPctDiv,racepctblack,racePctWhite,PctPopUnderPov,pctWPubAsst,pctWInvInc)

    #Do the ML algorithm here

    resultDictionary = {'ViolentCrimesPerPop': allCategoriesOutput} #Put whatever calculations you want to send to the front end here, these are just dummy values.
    return jsonify(resultDictionary)

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True) #backend will run on http://localhost:8000
#To test the api run the following (you can modify the attributes if you want):
#curl --location --request GET "http://localhost:8000/?PctLess9thGrade=2&PctNotHSGrad=3&PctBSorMore=4&PctUnemployed=5"
#Or download Postman for a nice UI